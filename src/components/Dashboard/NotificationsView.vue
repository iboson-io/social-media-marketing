<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed top-0 bottom-0 right-0 z-40 bg-black/40"
    :class="isCollapsed ? 'left-16' : 'left-64'"
    @click="$emit('close')"
  ></div>

  <!-- Popup -->
  <div
    v-if="open"
    class="fixed top-3 z-50 w-[40%] rounded-xl bg-white shadow-2xl"
    :class="isCollapsed ? 'left-20' : 'left-[16.5em]'"
  >
    <!-- Header -->
    <div class="flex items-start justify-between border-b p-4">
      <div>
        <h2 class="primary_text_color heading_h6_semibold">Notifications</h2>
        <p class="body_3_regular">
          Stay updated with your latest activities
        </p>
      </div>

      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 border-b px-4 py-3 bg-[#F1F2F4]">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="rounded-md px-2 py-1 flex text-center items-center"
        :class="
          activeTab === tab.key
            ? 'bg-[#fff] '
            : 'hover:bg-gray-100'
        "
       >
        <span class="label_2_semibold">{{ tab.label }} </span> <span class="label_3_regular">({{ tab.count }})</span>
      </button>
    </div>

    <!-- List -->
    <div class="max-h-[420px] space-y-2 overflow-y-auto p-4">
      <div
        v-for="item in filteredNotifications"
        :key="item.id"
        class="relative rounded-lg border p-4"
      >
        <!-- Status Dot -->
        <span
          class="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#155DFC]"
        ></span>

        <!-- Title -->
        <div class="mb-1 flex items-center gap-2">
          <p class="label_2_semibold">{{ item.title }}</p>

          <span
            class="rounded px-2 py-[2px] caption_1_medium"
            :class="item.badgeClass"
          >
            {{ item.badge }}
          </span>
        </div>

        <!-- Description -->
        <p class="label_2_regular">
          {{ item.description }}
        </p>

        <!-- Time -->
        <p class="body_4_regular">
          {{ item.time }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="border border-[#D1D5DB] p-1 flex items-center text-[#374151] bg-[#F3F4F6] flex justify-center gap-2 m-2 rounded rounded-md">
        <img :src="ClearIcon" alt=""> <span>Clear All</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ClearIcon from "../../assets/images/ClearIcon.svg"

defineProps({
  open: Boolean,
  isCollapsed: Boolean,
});

const activeTab = ref("all");

const tabs = [
  { key: "all", label: "All", count: 10 },
  { key: "review", label: "Drafts & Review", count: 2 },
  { key: "reminder", label: "Reminders", count: 1 },
  { key: "error", label: "System Errors", count: 2 },
];

const notifications = [
  {
    id: 1,
    type: "review",
    title: "AI draft ready for review",
    description:
      'Your post draft for "New Product Launch" is ready. Review and approve to publish.',
    badge: "Review",
    badgeClass: "bg-[#E9F2FF] text-[#1D7AFC] border border-[#CCE0FF]",
    time: "Just now",
  },
  {
    id: 2,
    type: "review",
    title: "AI suggested a rewrite",
    description:
      'A better headline is recommended for your blog post "Top 10 Social Tips".',
    badge: "Suggestion",
    badgeClass: "bg-[#F3F0FF] text-[#6E5DC6] border border-[#B8ACF6]",
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
    badgeClass: "bg-[#FFECEB] text-[#E2483D] border border-[#F87168]",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "success",
    title: "Post published successfully",
    description:
      'Your LinkedIn post for "Meet Our Team" is now live.',
    badge: "Success",
    badgeClass: "bg-[#FFECEB] text-[#E2483D] border border-[#F87168]",
    time: "2 days ago",
  },
];

const filteredNotifications = computed(() => {
  if (activeTab.value === "all") return notifications;
  return notifications.filter(n => n.type === activeTab.value);
});
</script>
