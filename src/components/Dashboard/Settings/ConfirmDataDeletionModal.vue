<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center bg_overlay backdrop-blur-sm"
    @click="$emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-full max-w-xl mx-3xl bg_secondary_color rounded-2xl shadow-2xl overflow-hidden p-6xl"
      @click.stop
    >
      <!-- Header -->
      <div >
        <div class="flex items-start justify-between">
          <h2 class="heading_h6_semibold primary_text_color">{{ title }}</h2>
        </div>
        <p class="body_3_regular secondary_text_color mt-6xl">
          {{ description }}
        </p>
      </div>

      <!-- Content -->
      <div class="mt-6xl">
        <!-- Verification Code Input -->
        <div>
          <label class="label_2_medium primary_text_color block">
            Verification Code:
          </label>
          <div class="flex gap-xxl justify-center mt-xl" ref="inputsContainer">
            <div
              v-for="(digit, index) in codeDigits"
              :key="index"
              class="relative"
            >
              <input
                v-model="codeDigits[index]"
                @input="handleCodeInput(index, $event)"
                @keydown="handleKeyDown(index, $event)"
                @paste="handlePaste"
                @focus="focusedInputIndex = index"
                @blur="focusedInputIndex = -1"
                type="text"
                maxlength="1"
                class="verification-input w-[2.1em] h-[2.1em] text-center text-xl md:text-4xl heading_2_medium primary_text_color border border-black-25 rounded-lg bg_secondary_color focus:outline-none focus:border-gray-50"
                :class="{ 'has-value': codeDigits[index] !== '' }"
              />
              <span
                v-if="!codeDigits[index] && focusedInputIndex !== index"
                class="dash-placeholder"
              >—</span>
            </div>
          </div>
        </div>

        <!-- Timer and Resend -->
        <div class="flex items-center  mt-6xl gap-xl">
          <div class="label_1_regular primary_text_color">
            Code expires in: <span class="label_1_bold primary_text_color">{{ formattedTime }}</span>
          </div>
          <button
            @click="handleResend"
            class="body_3_regular primary_text_color underline"
          >
            Resend Code
          </button>
        </div>
        
        <div class="block h-[1px] w-full bg-gray-25 mt-6xl"></div>
        <!-- Warning Message -->
        <div class=" bg-warning-50 text-warning-700 rounded-md flex items-start gap-md mt-6xl p-xl">
          <img :src="WarningIconOrange" alt="" class="mt-xs">
          <p class="body_3_medium text-warning-700">
            Note: All your account data will be deleted permanently. This action cannot be undone.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex gap-10xl mt-6xl">
        <button
          @click="$emit('close')"
          :disabled="isDeleting"
          class="lg:flex-1 rounded-lg p-3xl bg-gray-25 label_1_semibold  primary_text_color disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          :disabled="!isCodeComplete || isDeleting"
          class="flex-1 rounded-lg primary_2_text_color label_1_semibold  disabled:opacity-50 disabled:cursor-not-allowed bg-error-600"
        >
          {{ isDeleting ? 'Deleting...' : 'Delete Permanently' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import WarningIconOrange from "../../../assets/images/WarningIconOrange.svg"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirm Data Deletion",
  },
  description: {
    type: String,
    default: "To keep your account secure, we've sent a 6-digit verification code to your registered email address. Please enter it below to permanently delete all stored data.",
  },
  initialTime: {
    type: Number,
    default: 120, // 2 minutes in seconds
  },
});

const emit = defineEmits(["close", "delete", "resend"]);

const codeDigits = ref(["", "", "", "", "", ""]);
const timeRemaining = ref(props.initialTime);
const inputsContainer = ref(null);
const isDeleting = ref(false);
const focusedInputIndex = ref(-1);
let timerInterval = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const isCodeComplete = computed(() => {
  return codeDigits.value.every((digit) => digit !== "");
});

const handleCodeInput = (index, event) => {
  const value = event.target.value.replace(/[^0-9]/g, "");
  codeDigits.value[index] = value;

  // Auto-focus next input when a digit is entered
  if (value && index < 5) {
    const nextInput = inputsContainer.value?.querySelectorAll('input')[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const handleKeyDown = (index, event) => {
  // Handle backspace
  if (event.key === "Backspace") {
    if (codeDigits.value[index]) {
      // If current input has value, clear it
      codeDigits.value[index] = "";
    } else if (index > 0) {
      // If current input is empty, move to previous and clear it
      const prevInput = inputsContainer.value?.querySelectorAll('input')[index - 1];
      if (prevInput) {
        prevInput.focus();
        codeDigits.value[index - 1] = "";
      }
    }
  }
  // Handle arrow keys
  else if (event.key === "ArrowLeft" && index > 0) {
    const prevInput = inputsContainer.value?.querySelectorAll('input')[index - 1];
    if (prevInput) {
      prevInput.focus();
    }
  } else if (event.key === "ArrowRight" && index < 5) {
    const nextInput = inputsContainer.value?.querySelectorAll('input')[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData
    .getData("text")
    .replace(/[^0-9]/g, "")
    .slice(0, 6);

  for (let i = 0; i < pastedData.length && i < 6; i++) {
    codeDigits.value[i] = pastedData[i];
  }

  // Focus the next empty input or the last one
  const nextEmptyIndex = codeDigits.value.findIndex((digit) => digit === "");
  const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
  const inputs = inputsContainer.value?.querySelectorAll('input');
  if (inputs && inputs[focusIndex]) {
    inputs[focusIndex].focus();
  }
};

const handleDelete = () => {
  if (isCodeComplete.value && !isDeleting.value) {
    const code = codeDigits.value.join("");
    isDeleting.value = true;
    
    // Emit delete event
    emit("delete", code);
    
    // Wait 2 seconds then close the modal
    setTimeout(() => {
      isDeleting.value = false;
      emit("close");
    }, 2000);
  }
};

const handleResend = () => {
  emit("resend");
  // Reset timer
  timeRemaining.value = props.initialTime;
  // Reset code
  codeDigits.value = ["", "", "", "", "", ""];
};

const startTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      // Reset code and timer when modal opens
      codeDigits.value = ["", "", "", "", "", ""];
      timeRemaining.value = props.initialTime;
      isDeleting.value = false;
      startTimer();
      // Focus first input after modal opens
      setTimeout(() => {
        if (inputsContainer.value) {
          const firstInput = inputsContainer.value.querySelector("input");
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 100);
    } else {
      stopTimer();
      isDeleting.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => props.initialTime,
  (newTime) => {
    timeRemaining.value = newTime;
  }
);

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
input[type="text"]::-webkit-inner-spin-button,
input[type="text"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.verification-input {
  position: relative;
}

.dash-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  color: #9C9DA6;
  font-size: 1.5rem;
  line-height: 1;
  user-select: none;
  font-weight: 800;
}

.verification-input.has-value + .dash-placeholder,
.verification-input:focus + .dash-placeholder {
  display: none;
}
</style>

