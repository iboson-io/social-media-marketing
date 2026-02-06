<template>
  <div
    v-if="open"
    ref="dropdownRef"
    class="absolute left-0 bottom-full  py-2 bg_secondary_color rounded-xl shadow-2xl ring-1 ring-black/5 z-50 min-w-[200px]  post-dropdown-menu"
    @click.stop
    @touchstart.stop
  >
    <!-- Share Now -->
    <button
      @click="handleShare"
      class="w-full px-4 py-2.5 flex items-center justify-between "
    >
      <span class="body_3_regular primary_text_color">Share Now</span>
      <img :src="ShareIcon" alt="Share" class="w-4 h-4">
    </button>
    <div class="block h-[1px] w-full primary_border_color mt-xs"></div>
    <!-- Regenerate Post -->
    <button
      @click="handleRegenerate"
      class="w-full px-4 py-2.5 flex items-center justify-between mt-xs"
    >
      <span class="body_3_regular primary_text_color">Regenerate Post</span>
      <img :src="ImageEditIcon" alt="Edit" class="w-4 h-4">
    </button>
    <div class="block h-[1px] w-full primary_border_color mt-xs"></div>
    <!-- Delete -->
    <button
      @click="handleDelete"
      class="w-full px-4 py-2.5 flex items-center justify-between mt-xs"
    >
      <span class="body_3_regular delete_text_color">Delete</span>
      <img :src="TrashIcon" alt="Delete" class="w-4 h-4">
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ShareIcon from "../../assets/images/ShareIcon.svg";
import ImageEditIcon from "../../assets/images/ImageEditIcon.svg";
import TrashIcon from "../../assets/images/TrashIcon.svg";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'share', 'regenerate', 'delete']);

const dropdownRef = ref(null);

// Expose ref for parent component
defineExpose({
  dropdownRef
});

const handleShare = () => {
  emit('share');
  emit('close');
};

const handleRegenerate = () => {
  emit('regenerate');
  emit('close');
};

const handleDelete = () => {
  emit('delete');
  emit('close');
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>

