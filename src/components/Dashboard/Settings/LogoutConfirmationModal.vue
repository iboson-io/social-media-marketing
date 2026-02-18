<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center bg_overlay backdrop-blur-sm"
    @click="$emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-full max-w-xl mx-3xl bg_secondary_color rounded-2xl shadow-2xl overflow-hidden p-6xl"
      @click.stop
    >
      <!-- Header -->
      <div>
        <div class="flex items-start justify-between">
          <h2 class="heading_h5_semibold primary_text_color">{{ title }}</h2>
          <button
            @click="$emit('close')"
            class="bg-gray-25 p-xl rounded-md hover:bg-black-25"
          >
            <img :src="BlackCloseIcon" alt="Close">
          </button>
        </div>
        <div class="mt-6xl">
          <p class="label_1_regular secondary_text_color">{{ description }}</p>
          <p v-if="additionalInfo" class="mt-6xl label_1_regular secondary_text_color">
            {{ additionalInfo }}
          </p>
        </div>
      </div>
    <div class="block h-[1px] w-full bg-gray-25 mt-6xl"></div>
      <!-- Footer -->
      <div class="flex gap-md mt-6xl">
        <button
          @click="$emit('close')"
          class="md:flex-1 rounded-md p-xl bg-gray-25 label_1_semibold  primary_text_color"
        >
          Cancel
        </button>
        <button
          @click="handleConfirm"
          class="flex-1 p-xl rounded-md primary_2_text_color label_1_semibold  primary_text_color primary_button"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BlackCloseIcon from "../../../assets/images/BlackCloseIcon.svg";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Log Out From All Devices?",
  },
  description: {
    type: String,
    default: "This will immediately sign you out from all logged-in devices, including desktop, mobile, and web sessions.",
  },
  additionalInfo: {
    type: String,
    default: "You'll stay signed in on this current device.",
  },
  confirmButtonText: {
    type: String,
    default: "Log Out All Devices",
  },
});

const emit = defineEmits(["close", "confirm"]);

const handleConfirm = () => {
  emit("confirm");
};
</script>

