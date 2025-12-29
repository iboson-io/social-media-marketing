<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">

     <img :src="TickIcon" alt="Tick Icon">
      <!-- Heading -->
      <h2 class="heading_h5_semibold">
        Password Updated

      </h2>

      <p class="label_2_regular mt-3 mb-6">
     Your password has been successfully updated. You can now log in with your new credentials.      </p>
        <button class="primary_button w-full"> <router-link to="/signin">Go to Sign In </router-link> </button>
    </div>
  </div>
  
</template>
<script setup>
    import TickIcon from '../../assets/images/TickIcon.svg'
</script>
