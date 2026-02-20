<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-40 lg:inset-auto lg:top-0 lg:bottom-0 lg:right-0"
    :class="isCollapsed ? 'lg:left-16' : 'lg:left-64'"
    @click="$emit('close')"
  ></div>

  <!-- Popup -->
  <div
    v-if="open"
    class="fixed z-50 bg_secondary_color shadow-sm border primary_border_color bottom-[4.4em] w-64 lg:inset-auto lg:top-auto  popup_position lg:rounded-xl lg:w-60 px-md py-xl "
    :class="[
      isCollapsed ? 'left-4 lg:left-5' : 'left-4 lg:left-4',
      'rounded-xl'
    ]"
    @click.stop
  >
    <!-- Menu Options -->
    <div>
      <!-- Support Option -->
      <div 
        class="flex items-center gap-xl cursor-pointer px-xl py-xl rounded-lg hover:bg-info-50-hover transition-colors"
      >
    <img :src="Iicon" alt="" class="w-5 h-5">
      <span class="body_2_medium primary_text_color">Support</span>
      </div>

      <!-- Language Option -->
      <div 
        class="flex items-center justify-between gap-xl cursor-pointer px-xl py-xl rounded-lg hover:bg-info-50-hover transition-colors"
      >
        <div class="flex items-center gap-xl">
          <svg data-v-5e0b544f="" width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-current"><path d="M3 7.5H17M3 12.5H17M9.58333 2.5C8.17945 4.74968 7.43517 7.34822 7.43517 10C7.43517 12.6518 8.17945 15.2503 9.58333 17.5M10.4167 2.5C11.8205 4.74968 12.5648 7.34822 12.5648 10C12.5648 12.6518 11.8205 15.2503 10.4167 17.5M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10Z" stroke="#9C9DA6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span class="body_2_medium primary_text_color">Language</span>
        </div>
        <div class="flex items-center gap-sm">
          <span class="body_2_regular tertiary_text_color">English</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="tertiary_text_color">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Separator -->
      <div class="block h-[1px] w-full bg-gray-25"></div>

      <!-- Logout Option -->
      <div 
        class="flex items-center gap-xl cursor-pointer px-xl py-xl rounded-lg hover:bg-info-50-hover transition-colors"
        @click="handleSignOut"
      >
        <img :src="SignOutIcon" alt="Logout" class="w-5 h-5 opacity-60">
        <span class="body_2_medium primary_text_color">Logout</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SignOutIcon from "../../assets/images/SignOutIcon.svg"
import Iicon from "../../assets/images/Iicon.svg"


defineProps({
  open: Boolean,
  isCollapsed: Boolean,
});

const emit = defineEmits(["close", "signOut"]);

const handleSignOut = () => {
  emit("signOut");
  emit("close");
};
</script>

