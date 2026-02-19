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
    class="fixed z-50 bg_secondary_color shadow-sm border primary_border_color bottom-[4.4em] w-64 lg:inset-auto lg:top-auto  popup_position lg:rounded-xl lg:w-52 px-2 py-4 "
    :class="[
      isCollapsed ? 'left-4 lg:left-5' : 'left-4 lg:left-4',
      'rounded-xl'
    ]"
    @click.stop
  >
    <!-- User Account Card 1 -->
    <div>
      <div class="flex items-center gap-5 rounded-lg bg_secondary_color">
        <img 
          src="https://i.pravatar.cc/40" 
          class="h-10 w-10 rounded-full" 
          alt="Profile"
        />
        <div class="flex-1 min-w-0">
          <p class="label_2_semibold primary_text_color">Cliff Booth</p>
          <p class="body_4_regular tertiary_text_color">Cliffbooth@gmail.com</p>
        </div>
      </div>
    </div>
      
    <div class="block h-[1px] w-full bg-gray-25mt-5xl"></div>
    <!-- Sign Out Option -->
    <div 
      class="flex items-center gap-2 cursor-pointer mt-5xl"
      @click="handleSignOut"
    >
      <img :src="SignOutIcon" alt="">
      <span class="body_2_medium primary_text_color">Sign out</span>
    </div>

   
  </div>
</template>

<script setup>
import SignOutIcon from "../../assets/images/SignOutIcon.svg"

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

