<template>
  <div class="mx-auto mt-10 max-w-3xl hidden md:inline">
    <p class="mb-4  mt-10 text-left text-sm text-gray-500">
      Start with the example below
    </p>

      <section class="mt-xs max-w-3xl">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Card 1 -->
      <div class="card bg_secondary_color">
        <div>
          <img :src="HomeIcon" class="icon mb-2" />
        </div>
        <div class="flex text-start flex-col">
        <h3 class="label_1_semibold primary_text_color mb-2">Set Up Your Brand</h3>
        <p class="label_2_regular secondary_text_color">
          Let me learn your brand’s style, tone, and personality.
        </p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card bg_secondary_color">
        <div>
          <img :src="DateIcon" class="icon mb-2" />
        </div>
        <div class="flex text-start flex-col ">
        <h3 class="label_1_semibold primary_text_color mb-2">Plan Weekly Posts</h3>
        <p class="label_2_regular secondary_text_color">
          AI suggests days, times, and post ideas for your brand.
        </p>
      </div>
      </div>

      <!-- Card 3 -->
      <div class="card bg_secondary_color">
        <div>
          <img :src="GalleryIcon" class="icon mb-2" />
        </div>
        <div class="flex text-start flex-col">
        <h3 class="label_1_semibold primary_text_color mb-2">Create Social Media Posts</h3>
        <p class="label_2_regular secondary_text_color">
          AI generates engaging posts, and captions for your brand.
        </p>
      </div>
      </div>
    </div>
  </section>
  </div>
</template>
<script setup>
import HomeIcon from "../../assets/images/HomeIcon.svg"
import DateIcon from "../../assets/images/DateIcon.svg"
import GalleryIcon from "../../assets/images/GalleryIcon.svg"
</script>

