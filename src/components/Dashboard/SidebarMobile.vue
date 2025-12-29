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
      <div class="flex items-center gap-2 font-semibold text-purple-600">
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
      class="mb-6 w-full rounded-md bg-[#F3F0FF] py-2 text-sm font-medium text-purple-600"
    >
      ➕ New Chat
    </button>

    <!-- Chat History -->
    <p class="mb-2 text-xs font-semibold text-gray-400">Chat history</p>
    <div class="mb-6 space-y-1 text-sm">
      <div class="rounded-md px-2 py-2 hover:bg-gray-100">
        Create new product
      </div>
      <div class="rounded-md px-2 py-2 hover:bg-gray-100">
        Generate marketing plan
      </div>
      <div class="rounded-md px-2 py-2 hover:bg-gray-100">
        Create Instagram post
      </div>
    </div>

    <!-- Menu -->
    <nav class="space-y-2 text-sm">
      <div
        v-for="item in menuItems"
        :key="item.tab"
        @click="select(item.tab)"
        class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>
    </nav>

    <!-- User -->
    <div class="mt-6 flex items-center gap-3 rounded-md border p-3">
      <img src="https://i.pravatar.cc/40" class="h-8 w-8 rounded-full" />
      <div class="text-xs">
        <p class="font-medium">Cliff Booth</p>
        <p class="text-gray-400">cliffbooth@gmail.com</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["changeTab", "close"]);

const select = (tab) => emit("changeTab", tab);

const menuItems = [
  { icon: "📅", label: "Calendar", tab: "calendar" },
  { icon: "📊", label: "Analytics", tab: "analytics" },
  { icon: "📦", label: "Products", tab: "products" },
  { icon: "⚙️", label: "Settings", tab: "settings" },
  { icon: "🔔", label: "Notifications", tab: "notifications" },
];
</script>
