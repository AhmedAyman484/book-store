<template>
  <div class="ai-chat-container position-fixed">

    <button
      v-if="!isOpen"
      type="button"
      class="ai-floating-button d-flex align-items-center justify-content-center rounded-circle"
      @click="isOpen = true"
    >
      <i class="bi bi-robot"></i>
    </button>

    <div v-else class="ai-chat-box d-flex flex-column overflow-hidden">

      <div class="ai-chat-header d-flex align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-3">
          <div class="ai-header-icon">
            <i class="bi bi-robot"></i>
          </div>

          <div class="d-flex flex-column">
            <strong>AI Assistant</strong>
            <small>Ask me about this {{ contextType }}</small>
          </div>
        </div>

        <button
          type="button"
          class="ai-close-button d-flex align-items-center justify-content-center border-0 p-0"
          @click="isOpen = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div ref="messagesContainer" class="ai-chat-messages">

        <div class="ai-welcome d-flex align-items-start gap-3">
          <div class="ai-message-avatar">
            <i class="bi bi-robot"></i>
          </div>

          <div class="ai-welcome-content">
            <p class="ai-welcome-title">
              Hi! 👋 I'm your
              {{ contextType === "book" ? "Book" : "Author" }}
              Assistant.
            </p>

            <p class="ai-welcome-text">
              Ask me anything about this {{ contextType }}!
            </p>

            <p class="ai-welcome-text mb-0">
              I can help you with the summary, themes, characters,
              author details, and more.
            </p>
          </div>
        </div>

        <div class="ai-suggestions">
          <h6>You can try asking:</h6>

          <button
            type="button"
            class="ai-suggestion w-100 d-flex align-items-center"
            @click="
              userMessage = 'Give me a summary of this book';
              sendMessage();
            "
          >
            <i class="bi bi-book"></i>
            <span>Give me a summary of this book</span>
            <i class="bi bi-chevron-right"></i>
          </button>

          <button
            type="button"
            class="ai-suggestion w-100 d-flex align-items-center"
            @click="
              userMessage = 'Who are the main characters?';
              sendMessage();
            "
          >
            <i class="bi bi-person-fill"></i>
            <span>Who are the main characters?</span>
            <i class="bi bi-chevron-right"></i>
          </button>

          <button
            type="button"
            class="ai-suggestion w-100 d-flex align-items-center"
            @click="
              userMessage = 'What are the main themes?';
              sendMessage();
            "
          >
            <i class="bi bi-tag-fill"></i>
            <span>What are the main themes?</span>
            <i class="bi bi-chevron-right"></i>
          </button>

          <button
            type="button"
            class="ai-suggestion w-100 d-flex align-items-center"
            @click="
              userMessage = 'Tell me about the author';
              sendMessage();
            "
          >
            <i class="bi bi-feather"></i>
            <span>Tell me about the author</span>
            <i class="bi bi-chevron-right"></i>
          </button>

          <button
            type="button"
            class="ai-suggestion w-100 d-flex align-items-center"
            @click="
              userMessage = 'Why is this book popular?';
              sendMessage();
            "
          >
            <i class="bi bi-star-fill"></i>
            <span>Why is this book popular?</span>
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'ai-message',
            message.role === 'user'
              ? 'ai-message-user'
              : 'ai-message-bot'
          ]"
        >
          {{ message.text }}
        </div>

        <div
          v-if="loading"
          class="ai-message ai-message-bot"
        >
          Thinking...
        </div>
      </div>

      <div class="ai-chat-footer">

        <form
          class="ai-chat-input d-flex align-items-center gap-2 m-0"
          @submit.prevent="sendMessage"
        >
          <input
            v-model="userMessage"
            type="text"
            class="form-control"
            placeholder="Ask something..."
            :disabled="loading"
          />

          <button
            type="submit"
            class="ai-send-button flex-shrink-0 d-flex align-items-center justify-content-center border-0"
            :disabled="loading || !userMessage.trim()"
          >
            <i class="bi bi-send-fill"></i>
          </button>
        </form>

        <p class="ai-disclaimer mb-0 mt-2">
          AI responses are generated and may not be 100% accurate.
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import axios from "axios";

const props = defineProps({
  contextType: {
    type: String,
    default: "book",
  },

  contextData: {
    type: Object,
    default: () => ({}),
  },
});

const isOpen = ref(false);
const userMessage = ref("");
const loading = ref(false);

const messagesContainer = ref(null);

const messages = ref([]);

const scrollToBottom = async (smooth = true) => {
  await nextTick();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!messagesContainer.value) {
        return;
      }

      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    });
  });
};

watch(
  messages,
  async () => {
    await scrollToBottom(true);
  },
  {
    deep: true,
    flush: "post",
  }
);

watch(isOpen, async (open) => {
  if (open) {
    await scrollToBottom(false);
  }
});

async function sendMessage() {
  if (!userMessage.value.trim() || loading.value) {
    return;
  }

  const question = userMessage.value.trim();

  messages.value.push({
    role: "user",
    text: question,
  });

  userMessage.value = "";
  loading.value = true;

  await scrollToBottom(true);

  try {
    const context = `
You are an AI assistant inside a Book Store website.

The user is currently viewing a ${props.contextType}.

Information about the current ${props.contextType}:

${JSON.stringify(props.contextData, null, 2)}

Answer the user's question using this information when possible.

If the information is not available, clearly say that you don't have enough information.

Keep your answer helpful and concise.
`;

    const response = await axios.post("http://localhost:3001/ai", {
      message: question,
      context,
    });

    messages.value.push({
      role: "assistant",
      text: response.data.reply,
    });

  } catch (error) {
    console.error("AI Error:", error);

    if (error.response?.data?.error === "AI_LIMIT_REACHED") {
      messages.value.push({
        role: "assistant",
        text:
          error.response.data.reply ||
          "The AI usage limit has been reached. Please try again later.",
      });
    } else {
      messages.value.push({
        role: "assistant",
        text: "Sorry, I couldn't connect to the AI right now.",
      });
    }
  } finally {
    loading.value = false;

    await scrollToBottom(true);
  }
}
</script>