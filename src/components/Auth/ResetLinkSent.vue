<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">

      <img :src="EmailOpen" alt="Email Open Icon">
      <!-- Heading -->
      <h2 class="heading_h5_semibold primary_text_color">
       Reset Link Sent!

      </h2>

      <p class="label_2_regular secondary_text_color mt-3 mb-6">
            We’ve sent a password reset link to your email address.
      </p>
        <button class="primary_button w-full">Open Email</button>
        <div class="flex justify-between mt-5">
            <span class="underline label_2_medium primary_text_color"><RouterLink to="/forgot-password">Resend Link</RouterLink></span> <span class="underline label_2_medium primary_text_color"> <RouterLink to="/signin">Back to Sign In</RouterLink></span>
        </div>
    </div>
  </div>
</template>
<script setup>
    import EmailOpen from '../../assets/images/EmailOpenIcon.svg';
</script>
