<template>
  <div class="mx-auto max-w-3xl hidden md:inline">
    <p class="mt-9xl text-left label_2_semibold text_primary_color">
      Start with the example below
    </p>

      <section class="mt-xl max-w-3xl">
    <div class="grid grid-cols-1 gap-5xl md:grid-cols-3">
      <!-- Card 1 -->
      <div class="p-5xl rounded-lg border primary_border_color bg_secondary_color hover:border-black-25">
        <div>
          <img :src="HomeIcon" class="icon" />
        </div>
        <div class="flex text-start flex-col mt-5xl">
        <h3 class="label_1_semibold primary_text_color">Set Up Your Brand</h3>
        <p class="body_3_regular secondary_text_color mt-md">
          Let me learn your brand’s style, tone, and personality.
        </p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="p-5xl rounded-lg border primary_border_color bg_secondary_color hover:border-black-25">
        <div>
          <img :src="DateIcon" class="icon" />
        </div>
        <div class="flex text-start flex-col mt-5xl">
        <h3 class="label_1_semibold primary_text_color">Plan Weekly Posts</h3>
        <p class="body_3_regular secondary_text_color mt-md">
          AI suggests days, times, and post ideas for your brand.
        </p>
      </div>
      </div>

      <!-- Card 3 -->
      <div class="p-5xl rounded-lg border primary_border_color bg_secondary_color hover:border-black-25">
        <div>
          <img :src="GalleryIcon" class="icon " />
        </div>
        <div class="flex text-start flex-col mt-5xl">
        <h3 class="label_1_semibold primary_text_color">Create Social Media Posts</h3>
        <p class="body_3_regular secondary_text_color mt-md">
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

