<template>
  <div class="flex min-h-screen bg-white">
    <Sidebar :activeTab="activeTab" @changeTab="activeTab = $event" />

    <main class="flex-1 bg-gradient-to-br from-[#F6F3FF] to-white px-6 py-10">
      <!-- CHAT -->
      <ChatView v-if="activeTab === 'chat'" />

      <!-- OTHER TABS -->
      <CalendarView v-else-if="activeTab === 'calendar'" />
      <AnalyticsView v-else-if="activeTab === 'analytics'" />
      <ProductsView v-else-if="activeTab === 'products'" />
      <SettingsView v-else-if="activeTab === 'settings'" />
      <NotificationsView v-else-if="activeTab === 'notifications'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Sidebar from "../components/Dashboard/Sidebar.vue";
import ChatView from "../components/Dashboard/ChatView.vue";
import CalendarView from "../components/Dashboard/CalendarView.vue";
import AnalyticsView from "../components/Dashboard/AnalyticsView.vue";
import ProductsView from "../components/Dashboard/ProductsView.vue";
import SettingsView from "../components/Dashboard/SettingsView.vue";
import NotificationsView from "../components/Dashboard/NotificationsView.vue";

const activeTab = ref("chat"); // default
</script>
