<template>
  <aside
    class="flex h-screen flex-col border-r bg-white transition-all duration-300"
    :class="isCollapsed ? 'w-16 px-2' : 'w-64 px-4'"
  >
    <!-- Logo + Toggle -->
    <div class="mb-6 flex items-center justify-between py-4">
      <div class="flex items-center gap-2">
        <div
          class="h-7 w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
        ></div>

        <span v-if="!isCollapsed" class="heading_h5_semibold_logo gradient_text_color">
          Genius AI
        </span>
        
      </div>

      <!-- Toggle Button -->
      <button
        @click="isCollapsed = !isCollapsed">
        <img :src="SidebarIcon" alt="">
      </button>
    </div>

    <!-- New Chat -->

    <!-- New Chat -->
<div class="relative group">
  <button
    @click="changeTab('chat')"
    class="flex w-full items-center gap-2 rounded-md secondary_bg_color secondary_text_color secondary_label_medium px-[12px] py-[12px]"
    :class="isCollapsed ? 'justify-center' : ''"
  >
    <img :src="PlusIcon" alt="" class="h-5 w-5" />
    <span v-if="!isCollapsed" class="secondary_text_color">
      New Chat
    </span>
  </button>

  <!-- Tooltip (only when collapsed) -->
  <div
    v-if="isCollapsed"
    class="pointer-events-none absolute left-14 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
  >
    New Chat
  </div>
</div>


    <!-- Chat History -->
    <div v-if="!isCollapsed" class="mb-6">
      <p class="mb-2 label_2_semibold mt-4">Chat history</p>
      <div class="space-y-1 text-sm">
        <div class=" px-2 py-2 body_3_regular">
          Create new product
        </div>
        <div class=" px-2 py-2 body_3_regular">
          Generate marketing plan
        </div>
        <div class=" px-2 py-2 body_3_regular">
          Create Instagram post
        </div>
      </div>
    </div>

    <!-- Menu -->
    <nav class="mt-auto space-y-2 text-sm">
  <div
    v-for="item in menuItems"
    :key="item.tab"
    @click="changeTab(item.tab)"
    class="relative group flex cursor-pointer items-center gap-3 rounded-md py-2 hover:bg-gray-100"
    :class="[
      activeTab === item.tab ? 'bg-purple-100 text-purple-600' : '',
      isCollapsed ? 'justify-center' : 'px-2'
    ]"
  >
    <!-- Icon -->
    <img :src="item.icon" class="h-5 w-5 shrink-0" alt="" />

    <!-- Label (expanded view) -->
    <span v-if="!isCollapsed" class="label_1_medium">
      {{ item.label }}
    </span>

    <!-- Tooltip (collapsed view) -->
    <div
      v-if="isCollapsed"
      class="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
    >
      {{ item.label }}
    </div>
  </div>
</nav>


    <!-- User -->
    <div
      class="mt-6 flex items-center gap-3 rounded-md border p-3"
      :class="isCollapsed ? 'justify-center' : ''"
    >
      <img src="https://i.pravatar.cc/40" class="h-8 w-8 rounded-full" />

      <div v-if="!isCollapsed">
        <p class="label_2_semibold">Cliff Booth</p>
        <p class="label_3_regular">cliffbooth@gmail.com</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import Logo from '../../components/common/Logo.vue';
import SidebarIcon from "../../assets/images/SidebarIcon.svg";
import PlusIcon from "../../assets/images/PlusIcon.svg";
import CalenderIcon from "../../assets/images/CalendarIcon.svg";
import SettingsIcon from "../../assets/images/SettingsIcon.svg";
import NotificationIcon from "../../assets/images/NotificationIcon.svg";
import ProductIcon from "../../assets/images/ProductIcon.svg";
import AnalyticsIcon from "../../assets/images/AnalyticsIcon.svg";







defineProps({
  activeTab: String,
});

const emit = defineEmits(["changeTab"]);

const changeTab = (tab) => emit("changeTab", tab);

/* Sidebar Collapse */
const isCollapsed = ref(false);

/* Menu */
const menuItems = [
  { icon: CalenderIcon, label: "Calendar", tab: "calendar" },
  { icon: AnalyticsIcon, label: "Analytics", tab: "analytics" },
  { icon: ProductIcon, label: "Products", tab: "products" },
  { icon: SettingsIcon, label: "Settings", tab: "settings" },
  { icon: NotificationIcon, label: "Notifications", tab: "notifications" },
];
</script>
