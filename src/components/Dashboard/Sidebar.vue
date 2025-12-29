<template>
  <aside class="hidden lg:flex w-64 flex-col border-r bg-white px-4 py-6">
    <!-- Logo -->
    <div class="mb-6 flex items-center gap-2 text-lg font-semibold">
      <div class="h-7 w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
      Genius AI
    </div>

    <!-- New Chat -->
    <button
      @click="changeTab('chat')"
      class="mb-6 flex items-center gap-2 rounded-md bg-[#F3F0FF] px-3 py-2 text-sm font-medium text-purple-600"
    >
      ➕ New Chat
    </button>

    <!-- Chat History -->
    <div class="mb-6">
      <p class="mb-2 text-xs font-semibold text-gray-400">Chat history</p>

      <div class="space-y-1 text-sm">
        <div
          v-for="item in chatHistory"
          :key="item"
          class="cursor-pointer rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <!-- Menu Tabs -->
    <nav class="mt-auto space-y-1 text-sm">
      <div
        v-for="item in menuItems"
        :key="item.tab"
        @click="changeTab(item.tab)"
        class="cursor-pointer rounded-md px-2 py-2"
        :class="
          activeTab === item.tab
            ? 'bg-purple-100 text-purple-600'
            : 'text-gray-700 hover:bg-gray-100'
        "
      >
        {{ item.label }}
      </div>
    </nav>

    <!-- User -->
    <div class="mt-6 flex items-center gap-3 rounded-md border p-3">
      <img
        src="https://i.pravatar.cc/40"
        class="h-8 w-8 rounded-full"
      />
      <div class="text-xs">
        <p class="font-medium">Cliff Booth</p>
        <p class="text-gray-400">cliffbooth@gmail.com</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  activeTab: String,
});

const emit = defineEmits(["changeTab"]);

const changeTab = (tab) => emit("changeTab", tab);

/* Chat History */
const chatHistory = [
  "Create new product",
  "Generate marketing plan",
  "Create Instagram post",
];

/* Sidebar Menu */
const menuItems = [
  { label: "📅 Calendar", tab: "calendar" },
  { label: "📊 Analytics", tab: "analytics" },
  { label: "📦 Products", tab: "products" },
  { label: "⚙️ Settings", tab: "settings" },
  { label: "🔔 Notifications", tab: "notifications" },
];
</script>
