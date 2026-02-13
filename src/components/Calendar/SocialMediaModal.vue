<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center lg:justify-end lg:mr-10"
    @click="$emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-full md:max-w-2xl lg:max-w-lg mx-4 lg:mx-0 bg_secondary_color rounded-lg primary_border_color shadow-2xl p-6xl"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="label_2_semibold primary_text_color">Platforms</h2>
        <button
          @click="$emit('close')"
          class="p-md rounded-lg bg-gray-25 hover:bg-gray-50-hover"
          aria-label="Close"
        >
          <img :src="CloseIcon" alt="Close" class="w-5 h-5">
        </button>
      </div>
       <div class="block h-[1px] w-full bg-gray-25 mt-6xl"></div>
      <!-- Platforms Grid -->
      <div class="grid md:grid-cols-2 gap-6xl mt-6xl h-[23em] hide-scrollbar overflow-auto md:h-auto md:overflow-hidden">
        <!-- Instagram -->
        <div
          @click="togglePlatform('instagram')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('instagram') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md ">
            <img :src="InstagramIcon" alt="Instagram" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">Instagram</p>
              <p class="label_3_regular secondary_text_color mt-xxs">@lumovibe</p>
            </div>
          </div>
        </div>

        <!-- Twitter (X) -->
        <div
          @click="togglePlatform('twitter')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('twitter') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md">
            <img :src="TwitterIcon" alt="Twitter" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">Twitter (X)</p>
            </div>
          </div>
        </div>

        <!-- Facebook -->
        <div
          @click="togglePlatform('facebook')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('facebook') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md">
            <img :src="FacebookIcon" alt="Facebook" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">Facebook</p>
              <p class="label_3_regular secondary_text_color mt-xxs">@lumovibe</p>
            </div>
          </div>
        </div>

        <!-- TikTok -->
        <div
          @click="togglePlatform('tiktok')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('tiktok') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md">
            <img :src="TikTokIcon" alt="TikTok" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">TikTok</p>
            </div>
          </div>
        </div>

        <!-- LinkedIn -->
        <div
          @click="togglePlatform('linkedin')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('linkedin') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md">
            <img :src="LinkedInIcon" alt="LinkedIn" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">LinkedIn</p>
              <p class="label_3_regular secondary_text_color mt-xxs">@lumovibe</p>
            </div>
          </div>
        </div>

        <!-- YouTube -->
        <div
          @click="togglePlatform('youtube')"
          class="relative rounded-lg primary_border_color p-5xl cursor-pointer hover:bg-gray-25"
          :class="isSelected('youtube') ? 'selected_platform_border bg-gray-25' : ''"
        >
          <div class="flex items-center gap-md">
            <img :src="YoutubeIcon" alt="YouTube" class="w-10 h-10">
            <div class="flex-1">
              <p class="label_1_semibold primary_text_color">YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import InstagramIcon from "../../assets/images/InstagramIcon.svg";
import FacebookIcon from "../../assets/images/FacebookIcon.svg";
import LinkedInIcon from "../../assets/images/LinkedInIcon.svg";
import TwitterIcon from "../../assets/images/TwitterIcon.svg";
import TikTokIcon from "../../assets/images/TikTokIcon.svg";
import YoutubeIcon from "../../assets/images/YoutubeIcon.svg";
import CloseIcon from "../../assets/images/CloseIcon.svg";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  selectedPlatforms: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close', 'update:selectedPlatforms']);

// Local state for selected platforms
const localSelectedPlatforms = ref([...props.selectedPlatforms]);

// Watch for changes in props
watch(() => props.selectedPlatforms, (newPlatforms) => {
  localSelectedPlatforms.value = [...newPlatforms];
}, { immediate: true });

// Watch for modal open to reset local state
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    localSelectedPlatforms.value = [...props.selectedPlatforms];
  }
});

// Check if platform is selected
const isSelected = (platform) => {
  return localSelectedPlatforms.value.includes(platform);
};

// Toggle platform selection
const togglePlatform = (platform) => {
  const index = localSelectedPlatforms.value.indexOf(platform);
  if (index > -1) {
    localSelectedPlatforms.value.splice(index, 1);
  } else {
    localSelectedPlatforms.value.push(platform);
  }
  // Emit the updated platforms
  emit('update:selectedPlatforms', [...localSelectedPlatforms.value]);
};
</script>

<style scoped>
.purple-checkmark {
  filter: brightness(0) saturate(100%) invert(40%) sepia(93%) saturate(1352%) hue-rotate(242deg) brightness(98%) contrast(95%);
}
</style>

