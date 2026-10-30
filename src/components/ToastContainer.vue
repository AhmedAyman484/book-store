<template>
  <div
    class="toast-container-custom position-fixed d-flex flex-column"
    aria-live="polite"
    aria-atomic="true"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast-custom d-flex align-items-center"
      :class="`toast-${toast.type}`"
      role="status"
    >
      <i
        class="bi"
        :class="
          toast.type === 'success'
            ? 'bi-check-circle-fill'
            : 'bi-exclamation-circle-fill'
        "
      ></i>

      <span>
        {{ toast.message }}
      </span>

      <button
        type="button"
        aria-label="Close"
        @click="removeToast(toast.id)"
      >
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "../composables/useToast";

const { toasts, removeToast } = useToast();
</script>