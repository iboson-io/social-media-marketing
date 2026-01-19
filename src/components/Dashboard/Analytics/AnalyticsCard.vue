<template>
  <div
    :class="['flex items-start gap-4 rounded-2xl bg_white common_inner_gap primary_border_color shadow-sm flex-shrink-0 md:w-auto', mobileWdth]"
  >
    <!-- Content -->
    <div class="flex flex-col">
        <div>
             <img :src="icon" alt=""> 
        </div>
      
      <span class="label_1_medium normal_gap sub_text_color">
        {{ title }}
      </span>

      <span class=" heading_h5_bold">
        {{ value }}
      </span>

      <span class="regular_gap label_3_regular">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  description: String,
  icon: Object,
  iconBg: String,
  mobileWdth: String,
  iconColor: String,
});
</script>
