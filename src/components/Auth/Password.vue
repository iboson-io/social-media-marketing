<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">
       <img :src="LockIcon" alt="Lock Icon">
      <!-- Heading -->
      <h2 class="heading_h5_semibold">
        Enter Password
      </h2>

      <p class="label_2_regular mt-3 mb-6">
        Please enter your password to access your account securely.
      </p>

      <!-- Password Field -->
      <div>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input_box"
          />

          <!-- Eye Icon -->
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <img
              v-if="!showPassword"
              :src="EyeOpenIcon"
              alt="Show password"
            />
            <span v-else>🙈</span>
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="error_text">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="button"
        class="primary_button w-full mt-6"
        @click="handleSubmit"
      >
        Sign In
      </button>

      <!-- Links -->
      <div class="flex justify-between mt-5">
        <span class="underline label_2_medium cursor-pointer">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
        </span>
        <span class="underline label_2_medium">
          <RouterLink to="/signin">Back to Sign In</RouterLink>
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EyeOpenIcon from "../../assets/images/EyeOpen.svg";
import LockIcon from "../../assets/images/LockIcon.svg";

/* State */
const showPassword = ref(false);
const password = ref("");
const errorMessage = ref("");

/* Password Regex */
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

/* Toggle Password */
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

/* Submit & Validation */
const handleSubmit = () => {
  errorMessage.value = "";

  if (!password.value) {
    errorMessage.value = "Password is required";
    return;
  }

  if (!passwordRegex.test(password.value)) {
    errorMessage.value =
      "Password must be at least 8 characters long and include one uppercase letter and one number";
    return;
  }

  // ✅ If validation passes
  console.log("Password valid, proceed with login");
};
</script>

