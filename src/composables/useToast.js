import { ref } from "vue";

const toasts = ref([]);

let nextId = 1;

export function useToast() {
  const showToast = (
    message,
    type = "success",
    duration = 3200
  ) => {
    const id = nextId++;

    toasts.value.push({
      id,
      message,
      type,
    });

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(
      (toast) => toast.id !== id
    );
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
}