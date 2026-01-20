<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">
       <img :src="LockIcon" alt="Lock Icon">
      <!-- Heading -->
      <h2 class="heading_h5_semibold">
        Reset Password
      </h2>

      <p class="label_2_regular mt-3 mb-6">
       Enter your new password below to secure your account.
      </p>

      <!-- Password Field -->
      <div>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="New Password"
            class="input_box regular_border_color"
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
        <p v-if="errorMessage" class="error_text error_message_text_alignment">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="button"
        class="primary_button w-full mt-6"
        @click="handleSubmit"
      >
        Update Password
      </button>

      <!-- Links -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import EyeOpenIcon from "../../assets/images/EyeOpen.svg";
import LockIcon from "../../assets/images/LockIcon.svg";

const router = useRouter();
/* State */
const showPassword = ref(false);
const password = ref("");
const errorMessage = ref("");

/* Password Regex */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/;

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
     "Oops! The password you entered is incorrect.";
    return;
  }
  router.push('/password-updation');
  // ✅ If validation passes
  console.log("Password valid, proceed with login");
};
</script>

