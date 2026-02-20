<template>
  <!-- Backdrop -->
  <div v-if="open" class="fixed inset-0 z-40 bg_overlay lg:inset-auto lg:top-0 lg:bottom-0 lg:right-0"
    :class="isCollapsed ? 'lg:left-16' : 'lg:left-64'" @click="$emit('close')"></div>

  <!-- Popup -->
  <div v-if="open"
    class="fixed inset-0 z-50 bg_secondary_color  h-[100%]  lg:inset-auto lg:top-0  lg:w-[40%] py-6xl px-5xl"
    :class="isCollapsed ? 'lg:left-20' : 'lg:left-[16em]'">
    <!-- Header -->
    <div class="flex items-start justify-between ">
      <div>
        <h2 class="heading_h6_bold primary_text_color">Notifications</h2>
        <p class="body_3_regular secondary_text_color mt-sm">
          Stay updated with your latest activities
        </p>
      </div>

      <button @click="$emit('close')" class="secondary_text_color">
        ✕
      </button>
    </div>

    <!-- Tabs -->
    <div
      class="flex mt-5xl gap-lg 2xl:gap-9xl bg-gray-25 px-md py-xs rounded-lg overflow-scroll 2xl:justify-center  scrollbar-hide">
      <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
        class="flex items-center gap-xxs rounded-md px-md py-xs flex-shrink-0" :class="
          activeTab === tab.key
            ? 'bg_secondary_color'
            : 'hover:bg-gray-50-hover'
        ">
        <span class="label_2_semibold primary_text_color whitespace-nowrap">{{ tab.label }}</span>
        <span class="label_2_semibold secondary_text_color whitespace-nowrap">({{ tab.count }})</span>
      </button>
    </div>

    <div class="block h-[1px] w-full bg-gray-25 mt-5xl"></div>
    <!-- CONTENT -->
    <div class="mt-xxs">
      <!-- EMPTY STATE -->
      <div v-if="filteredNotifications.length === 0"
        class="flex h-[68vh] flex-col items-center justify-center text-center">
        <div class="mb-4 flex items-center justify-center rounded-full">
          <img :src="BellIcon" alt="" class="h-32 w-32">
        </div>

        <p class="label_1_medium primary_text_color">Notification</p>
        <p class="body_3_regular secondary_text_color">
          You have no notifications right now. <br />
          Come back later.
        </p>
      </div>

      <!-- NOTIFICATION LIST -->
      <div v-else class="max-h-[100%] overflow-y-auto h-[65vh] md:h-[80vh] lg:h-[60vh] 2xl:h-[80vh]">
        <div v-for="item in filteredNotifications" :key="item.id"
          class="relative rounded-lg primary_border_color p-xl bg_primary_color mt-4xl">
          <!-- Status Dot -->
          <span class="absolute right-3 top-2 h-2 w-2 rounded-full bg-error-600"></span>

          <!-- Title -->
          <div>
            <span class="rounded-md px-md py-xs caption_1_medium" :class="item.badgeClass">
              {{ item.badge }}
            </span>
            <p class="label_1_semibold primary_text_color mt-xl">{{ item.title }}</p>
          </div>

          <!-- Description -->
          <p class="label_2_regular secondary_text_color mt-sm">
            {{ item.description }}
          </p>

          <!-- Time -->
          <p class="body_4_regular tertiary_text_color mt-md">
            {{ item.time }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="notifications.length"
      class="absolute w-[93%] bottom-5xl mt-5xl flex cursor-pointer items-center justify-center gap-md rounded-md bg-gray-25 p-md label_1_semibold primary_text_color"
      @click="clearAll">
      <img :src="ClearIcon" />
      <span class="label_2_medium primary_text_color">Clear All</span>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import ClearIcon from "../../assets/images/ClearIcon.svg";
  import BellIcon from "../../assets/images/BellIcon.svg";
  import { useNotifications } from "../../composables/useNotifications";

  defineProps({
    open: Boolean,
    isCollapsed: Boolean,
  });

  const emit = defineEmits(["close", "notificationCountChange"]);
  const { setNotificationCount } = useNotifications();

  const activeTab = ref("all");

  /* 🔥 REACTIVE DATA */
  const notifications = ref([
    {
      id: 1,
      type: "review",
      title: "AI draft ready for review",
      description:
        'Your post draft for "New Product Launch" is ready. Review and approve to publish.',
      badge: "Review",
      badgeClass: "bg-blue-100 text-blue-200 border border-blue-100",
      time: "Just now",
    },
    {
      id: 2,
      type: "review",
      title: "AI suggested a rewrite",
      description:
        'A better headline is recommended for your blog post "Top 10 Social Tips".',
      badge: "Suggestion",
      badgeClass: "bg-orange-25 text-orange-200 border border-orange-100",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "reminder",
      title: "Scheduled post pending approval",
      description:
        '"Black Friday Offer" is scheduled for tomorrow. Approve before publishing.',
      badge: "Reminder",
      badgeClass: "bg-[#FFF7D6] text-[#B38600] border border-[#F5CD47]",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "error",
      title: "Publishing failed",
      description:
        "Instagram API connection failed. Reconnect to continue auto-posting.",
      badge: "Error",
      badgeClass: "bg-error-25 text-error-600 border border-error-200",
      time: "2 hours ago",
    },
  ]);

  /* TABS (AUTO COUNTS) */
  const tabs = computed(() => [
    { key: "all", label: "All", count: notifications.value.length },
    {
      key: "review",
      label: "Drafts & Review",
      count: notifications.value.filter(n => n.type === "review").length,
    },
    {
      key: "reminder",
      label: "Reminders",
      count: notifications.value.filter(n => n.type === "reminder").length,
    },
    {
      key: "error",
      label: "System Errors",
      count: notifications.value.filter(n => n.type === "error").length,
    },
  ]);

  /* FILTER */
  const filteredNotifications = computed(() => {
    if (activeTab.value === "all") return notifications.value;
    return notifications.value.filter(n => n.type === activeTab.value);
  });

  /* CLEAR ALL */
  const clearAll = () => {
    notifications.value = [];
    activeTab.value = "all";
  };

  /* WATCH NOTIFICATION COUNT AND EMIT CHANGES */
  watch(
    () => notifications.value.length,
    (count) => {
      emit("notificationCountChange", count);
      setNotificationCount(count);
    },
    { immediate: true }
  );
</script>

<style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
  }
</style>