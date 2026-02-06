<template>
  <div class="primary_border_color rounded-xl p-6xl bg_secondary_color w-[75%] md:w-full flex-shrink-0  min-w-[200px] md:flex-shrink md:min-w-0">
    <!-- Icon + Title -->
    <div class="flex items-start flex-col">
      <img :src="icon" alt="">
      <div class="mt-xl gap-1 flex">
      <p class="label_2_medium primary_text_color">{{ title }}</p>
      <img :src="Iicon" alt="">
      </div>
    </div>

    <!-- Value -->
    <p class="mt-xl heading_h6_semibold primary_text_color">
      {{ used }} of {{ total }} used
    </p>

    <!-- Progress bar -->
    <div class="mt-xl h-[6px] w-full rounded-full bg_primary_color">
      <div
        class="h-[6px] rounded-full bg_bar_color transition-all duration-300"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Iicon from "../../../assets/images/Iicon.svg";


const props = defineProps({
  title: String,
  used: Number,
  total: Number,
  icon: String,
});

const percentage = computed(() => {
  return Math.min((props.used / props.total) * 100, 100);
});
</script>
