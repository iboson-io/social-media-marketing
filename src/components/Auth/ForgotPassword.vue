<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">
     <img :src="LockIcon" alt="Lock Icon">

      <!-- Heading -->
      <h2 class="heading_h5_semibold">
        Forgot Password
      </h2>

      <p class="label_1_regular mt-3 mb-6">
        Enter your email address and we'll send you instructions to reset your password.
      </p>


      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">

        <!-- Email -->
        <div>
  <div class="relative">
    <!-- Email Icon -->
    <span
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      <img :src="Email" alt="Email Icon">
      <!-- OR use an SVG / image icon here -->
    </span>

    <!-- Input -->
    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="input_box pl-10 regular_border_color"
    />
  </div>

  <!-- Error Message -->
  <p v-if="errors.email" class="error_text">
    {{ errors.email }}
  </p>
</div>


        <!-- Submit -->
        <button
          type="submit"
          class="primary_button w-full"
        >
          Send Reset Link
        </button>
      </form>

      <!-- Footer -->
      <p class="label_1_regular mt-5 flex justify-center">
        <RouterLink
          to="/signin"
          class="ml-1 cursor-pointer font-medium underline primary_text_color"
        >
          Back to Sign In
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import GoogleSignin from "../../components/Auth/GoogleSignin.vue";
import Logo from "../../components/common/Logo.vue";
import { useRouter } from "vue-router";
import LockIcon from "../../assets/images/LockIcon.svg";
import Email from "../../assets/images/Email.svg";


const router = useRouter();
/* Form State */
const form = reactive({
  email: "",
});

/* Error State */
const errors = reactive({
  email: "",
});

/* Email Regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Submit Handler */
const handleSubmit = () => {
  errors.email = "";

  if (!form.email) {
    errors.email = "Email is required";
    return;
  }

  if (!emailRegex.test(form.email)) {
    errors.email = "Enter a valid email address";
    return;
  }
  
  router.push("/reset-link");
  
};
</script>
