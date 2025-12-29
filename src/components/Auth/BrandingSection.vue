<template>
  <div
    class="relative hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#F6F4FF] to-[#F2EEFF] px-10"
  >
    <!-- Logo -->
    <Logo />

    <!-- Sphere -->
    <div
      class="h-48 w-48 "
    >
     <img :src="LogoImage" alt="Logo" />
    </div>

    <!-- Text -->
    <h2 class="heading_h4_bold gradient_text_color">
      Let AI Run Your Marketing
    </h2>

    <p class="label_1_regular text-center">
      Create, schedule, and optimize social media posts automatically with
      AI-powered intelligence.
    </p>
  </div>
</template>
<script setup>  
    import LogoImage from '../../assets/images/LogoImage.png'
    import Logo from '../../components/common/Logo.vue';
</script>
