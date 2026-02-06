<template>
  <div
    v-if="open"
    class="fixed z-[70] bg_secondary_color rounded-lg shadow-lg min-w-[320px] max-w-[400px] p-6xl absolute top-0 right-0 md:top-6 md:right-6"
  >
    <!-- Close Button -->
    <button
      @click="handleClose"
      class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center "
    >
      <img :src="CloseIcon" alt="" class="close_button_style">
    </button>

    <div class="flex items-center  gap-3 pr-3">
      <!-- Green Checkmark Icon -->
      <img :src="ToastIcons" alt="">
      
      <!-- Content -->
      <div class="flex-1">
        <p class="label_1_semibold primary_text_color">
          {{ mainMessage }}
        </p>
        <p v-if="secondaryMessage" class="label_2_regular secondary_text_color mt-xl">
          {{ secondaryMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CloseIcon from "../../assets/images/CloseIcon.svg"
  import ToastIcons from "../../assets/images/ToastIcons.svg"

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  mainMessage: {
    type: String,
    required: true,
  },
  secondaryMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

