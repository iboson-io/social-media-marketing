<template>
  <div class="flex items-center justify-center px-6xl min-h-screen">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="block lg:hidden">
        <Logo />
      </div>

      <!-- Heading -->
      <h2 class="heading_h5_semibold primary_text_color">
        Create your account
      </h2>

      <p class="body_2_regular secondary_text_color mt-md">
        Start creating AI-powered social posts for your brand.
      </p>

      <!-- Google Sign In -->
      <GoogleSignin />

      <!-- Divider -->
      <div class="my-4xl flex items-center gap-3">
        <div class="h-px flex-1 bg-gray-25"></div>
        <span class="or_text">OR</span>
        <div class="h-px flex-1 bg-gray-25"></div>
      </div>

      <!-- Form -->
      <form novalidate @submit.prevent="handleSubmit">

        <!-- Full Name -->
        <div>
          <input
            v-model="form.name"
            type="text"
            placeholder="Fullname"
            class="input_box"
            :class="inputClass(errors.name)"
          />
          <p v-if="errors.name" class="error_text">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <input
            v-model="form.email"
            type="text"
            placeholder="Email"
            class="input_box mt-4xl"
            :class="inputClass(errors.email)"
          />
          <p v-if="errors.email" class="error_text">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="input_box mt-4xl pr-10xl"
              :class="inputClass(errors.password)"
            />

            <button
              type="button"
              @click="togglePassword"
              class="absolute right-xl top-[62%] -translate-y-1/2"
            >
              <img v-if="!showPassword" :src="EyeOpenIcon" />
              <span v-else><img :src="EyeCloseIcon" alt=""></span>
            </button>
          </div>

          <p v-if="errors.password" class="error_text">{{ errors.password }}</p>
        </div>

        <!-- Terms -->
        <div>
          <label class="label_3_regular flex items-start gap-md mt-6xl">
            <input
              type="checkbox"
              v-model="form.terms"
              class="accent-gray-25 mt-xxs border-gray-25 scale-125 checked:bg-gray-25 checked:border-gray-25"
            />
            <span class="secondary_text_color">
              I agree to the
              <a class="underline primary_text_color">Terms of Service</a>
              and
              <a class="underline primary_text_color">Privacy Policy</a>
            </span>
          </label>

          <p v-if="errors.terms" class="error_text">{{ errors.terms }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="!isFormFilled"
          class="w-full rounded-md py-md font-medium transition mt-6xl"
          :class="isFormFilled
            ? 'primary_button'
            : 'disabled_primary_button'"
        >
          Create Account
        </button>
      </form>

      <!-- Footer -->
      <p class="body_2_regular secondary_text_color flex justify-center mt-6xl">
        Already have an account?
        <RouterLink
          to="/signin"
          class="ml-xs underline Body_2_Medium primary_text_color"
        >
          Log in
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue"
import { useRouter } from "vue-router"
import GoogleSignin from "../../components/Auth/GoogleSignin.vue"
import EyeOpenIcon from "../../assets/images/EyeOpen.svg"
import Logo from "../../components/common/Logo.vue"
import EyeCloseIcon from "../../assets/images/EyeCloseIcon.svg"

const router = useRouter()

/* Form State */
const form = reactive({
  name: "",
  email: "",
  password: "",
  terms: false,
})

/* Error State */
const errors = reactive({
  name: "",
  email: "",
  password: "",
  terms: "",
})

/* Regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/;

/* Password Toggle */
const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

/* Button Enable Logic (ONLY filled check) */
const isFormFilled = computed(() => {
  return (
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.terms
  )
})

/* Input Border */
const inputClass = (error) =>
  error
    ? "error_border_color"
    : "regular_border_color"

/* Submit → FULL validation happens here */
const handleSubmit = () => {
  errors.name = ""
  errors.email = ""
  errors.password = ""
  errors.terms = ""

  let isValid = true

  if (!form.name) {
    errors.name = "Full name is required"
    isValid = false
  }

  if (!form.email) {
    errors.email = "Email is required"
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Enter a valid email address"
    isValid = false
  }

  if (!form.password) {
    errors.password = "Password is required"
    isValid = false
  } else if (!passwordRegex.test(form.password)) {
    errors.password =
      "Oops! The password you entered is incorrect."
    isValid = false
  }

  if (!form.terms) {
    errors.terms = "You must accept the terms"
    isValid = false
  }

  if (isValid) {
    router.push("/email-validation")
  }
}
</script>
