<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity duration-300 ease-in-out"
    :class="{ 'opacity-0': !isOpen, 'pointer-events-none': !isOpen }"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <aside
    class="fixed left-0 top-0 z-50 h-full w-72 bg-white p-4 shadow-lg lg:hidden transform transition-transform duration-300 ease-in-out"
    :class="{ '-translate-x-full': !isOpen, 'pointer-events-none': !isOpen }"
  >
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2 heading_h5_semibold_logo gradient_text_color">
        <div
          class="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
        ></div>
        Genius AI
      </div>
      <button @click="$emit('close')" class="text-xl">✕</button>
    </div>

    <!-- New Chat -->
    <button
      @click="select('chat')"
      class="mb-6 w-full rounded-md secondary_bg_color py-3 text-sm font-medium secondary_text_color secondary_label_medium flex gap-2"
    >
      <img :src="PlusIcon" alt="" class="ml-3"> New Chat
    </button>

    <!-- Chat History -->
    <p class="mb-2 label_2_semibold">Chat history</p>
    <div class="mb-6 space-y-1 text-sm">
      <div class="px-2 py-2 body_3_regular">
        Create new product
      </div>
      <div class=" px-2 py-2 body_3_regular">
        Generate marketing plan
      </div>
      <div class=" px-2 py-2 body_3_regular">
        Create Instagram post
      </div>
    </div>

    <!-- Menu -->
    <nav class="space-y-2 text-sm">
      <div
        v-for="item in menuItems"
        :key="item.tab"
        @click="select(item.tab)"
        class="flex cursor-pointer items-center gap-3  px-2 py-2"
      >
        <img :src="item.icon" alt="">
        <span v-if="!isCollapsed" class="label_1_medium">{{ item.label }}</span>
      </div>
    </nav>

    <!-- User -->
    <div class="mt-6 flex items-center gap-3 rounded-md border p-3">
      <img src="https://i.pravatar.cc/40" class="h-8 w-8 rounded-full" />
      <div class="text-xs">
        <p class="label_2_semibold">Cliff Booth</p>
        <p class="label_3_regular">cliffbooth@gmail.com</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import PlusIcon from "../../assets/images/PlusIcon.svg";
import CalenderIcon from "../../assets/images/CalendarIcon.svg";
import SettingsIcon from "../../assets/images/SettingsIcon.svg";
import NotificationIcon from "../../assets/images/NotificationIcon.svg";
import ProductIcon from "../../assets/images/ProductIcon.svg";
import AnalyticsIcon from "../../assets/images/AnalyticsIcon.svg";


const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["changeTab", "close"]);

const select = (tab) => emit("changeTab", tab);

const menuItems = [
  { icon: CalenderIcon, label: "Calendar", tab: "calendar" },
  { icon: AnalyticsIcon, label: "Analytics", tab: "analytics" },
  { icon: ProductIcon, label: "Products", tab: "products" },
  { icon: SettingsIcon, label: "Settings", tab: "settings" },
  { icon: NotificationIcon, label: "Notifications", tab: "notifications" },
];
</script>
