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

        <span v-if="!isCollapsed" class="text-lg font-semibold">
          Genius AI
        </span>
      </div>

      <!-- Toggle Button -->
      <button
        @click="isCollapsed = !isCollapsed"
        class="text-gray-500 hover:text-purple-600"
      >
        ☰
      </button>
    </div>

    <!-- New Chat -->
    <button
      @click="changeTab('chat')"
      class="mb-6 flex items-center gap-2 rounded-md bg-[#F3F0FF] py-2 text-sm font-medium text-purple-600"
      :class="isCollapsed ? 'justify-center' : 'px-3'"
    >
      ➕
      <span v-if="!isCollapsed">New Chat</span>
    </button>

    <!-- Menu -->
    <nav class="mt-auto space-y-2 text-sm">
      <div
        v-for="item in menuItems"
        :key="item.tab"
        @click="changeTab(item.tab)"
        class="flex cursor-pointer items-center gap-3 rounded-md py-2 text-gray-700 hover:bg-gray-100"
        :class="[
          activeTab === item.tab ? 'bg-purple-100 text-purple-600' : '',
          isCollapsed ? 'justify-center' : 'px-2'
        ]"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </div>
    </nav>

    <!-- User -->
    <div
      class="mt-6 flex items-center gap-3 rounded-md border p-3"
      :class="isCollapsed ? 'justify-center' : ''"
    >
      <img src="https://i.pravatar.cc/40" class="h-8 w-8 rounded-full" />

      <div v-if="!isCollapsed" class="text-xs">
        <p class="font-medium">Cliff Booth</p>
        <p class="text-gray-400">cliffbooth@gmail.com</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  activeTab: String,
});

const emit = defineEmits(["changeTab"]);

const changeTab = (tab) => emit("changeTab", tab);

/* Sidebar Collapse */
const isCollapsed = ref(false);

/* Menu */
const menuItems = [
  { icon: "📅", label: "Calendar", tab: "calendar" },
  { icon: "📊", label: "Analytics", tab: "analytics" },
  { icon: "📦", label: "Products", tab: "products" },
  { icon: "⚙️", label: "Settings", tab: "settings" },
  { icon: "🔔", label: "Notifications", tab: "notifications" },
];
</script>
