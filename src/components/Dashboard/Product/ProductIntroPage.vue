<template>
    <div class="flex-1 bg_primary_color px-3xl py-12xl md:px-10xl lg:py-10xl">
    <!-- Card -->
    <div
      class="w-full  rounded-2xl bg_secondary_color  h-[100%] shadow-sm flex items-center justify-center"
    >
      <div class="flex flex-col items-center text-center">
        <!-- Illustration -->
        <img
          :src="ProductIntroImage"
          alt="Empty State"
          class="h-44 w-auto"
        />

        <!-- Title -->
        <h2 class="heading_h6_bold primary_text_color mt-6xl">
          Add Your First Product
        </h2>

        <!-- Description -->
        <p class="mt-md label_1_regular secondary_text_color">
          Manage your brands, connect their channels, and keep assets in one place.
        </p>

        <!-- Button -->
        <button
          @click="$emit('add-product')"
          class="mt-5xl flex items-center gap-md  primary_button px-xl py-md"
        >
          <img :src="PlusIconWhite" alt="">
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
    import ProductIntroImage from "../../../assets/images/ProductIntroImage.png"
    import PlusIconWhite from "../../../assets/images/PlusIconWhite.svg"
    
    defineEmits(["add-product"]);
</script>
