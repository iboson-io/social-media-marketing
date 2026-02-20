import { ref } from 'vue';

// Shared notification state
const notificationCount = ref(4); // Initial count matches the default notifications

export function useNotifications() {
  const setNotificationCount = (count) => {
    notificationCount.value = count;
  };

  const getNotificationCount = () => {
    return notificationCount.value;
  };

  return {
    notificationCount,
    setNotificationCount,
    getNotificationCount,
  };
}

