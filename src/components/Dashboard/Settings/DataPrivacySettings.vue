<template>
  <div class="rounded-2xl bg_white common_inner_gap shadow-sm">
    <!-- Header -->
    <h2 class="heading_h6_bold">Data & Privacy Settings</h2>
    <p class="label_1_regular regular_gap medium_mb">
      Manage how your personal and brand data is stored and used.
    </p>

    <!-- Delete your data -->
    <div class="flex flex-col md:flex-row items-start md:justify-between gap-4 mb-8">
      <div class="flex-1">
        <h3 class="label_1_semibold">Delete your data</h3>
        <p class="label_1_regular regular_gap">
          Permanently remove all account data.
        </p>
      </div>
      <button
        class="button_thin px-6 rounded-lg inputbox_border_color bg_white sub_button_semibold"
      >
        Delete My Data
      </button>
    </div>

    <!-- AI Content Learning -->
    <div class="flex flex-row-reverse  md:flex-row items-start md:justify-between gap-4 mb-8">
      <div class="flex-1">
        <h3 class="label_1_semibold">AI Content Learning</h3>
        <p class="label_1_regular regular_gap">
          Allow AI learning from content:
        </p>
      </div>
      <button
        @click="aiContentLearning = !aiContentLearning"
        type="button"
        class="relative inline-flex h-6 w-11 items-center rounded-full  "
        :class="aiContentLearning ? 'bg-[#000] lg:bg_toggle_button' : 'bg-[#DCDFE4]'"
      >
        <span
          class="inline-block h-5 w-5 transform rounded-full bg_white transition-transform"
          :class="aiContentLearning ? 'translate-x-5' : 'translate-x-1'"
        ></span>
      </button>
    </div>

    <!-- Analytics Sharing -->
    <div class="flex flex-row-reverse  md:flex-row items-start md:justify-between gap-4 medium_mb">
      <div class="flex-1">
        <h3 class="label_1_semibold">Analytics Sharing</h3>
        <p class="label_1_regular regular_gap">
          Share analytics for improvements:
        </p>
      </div>
      <button
        @click="analyticsSharing = !analyticsSharing"
        type="button"
        class="relative inline-flex h-6 w-11 items-center rounded-full "
        :class="analyticsSharing ? 'bg-[#000] lg:bg_toggle_button' : 'bg-[#DCDFE4]'"
      >
        <span
          class="inline-block h-5 w-5 transform rounded-full bg_white transition-transform"
          :class="analyticsSharing ? 'translate-x-5' : 'translate-x-1'"
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const aiContentLearning = ref(true);
const analyticsSharing = ref(false);
</script>

