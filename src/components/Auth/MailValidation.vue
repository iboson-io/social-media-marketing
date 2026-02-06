<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">


      <!-- Heading -->
      <h2 class="heading_h5_semibold primary_text_color">
        Please Verify Your Email

      </h2>

      <p class="label_2_regular secondary_text_color mt-3 mb-6">
        We've sent a message to manu@ibosoninnov.com with a link to activate your account. If you can't find our email, check your spam or junk folder, or click below to resend the email.
      </p>
        <button class="primary_button w-full">Open Email</button>
        <div class="flex justify-between mt-5">
            <span class="underline label_2_medium primary_text_color">Resend Verification Email</span> <span class="underline label_2_medium"> <RouterLink to="/signup">Back to Sign Up</RouterLink></span>
        </div>
    </div>
  </div>
</template>
