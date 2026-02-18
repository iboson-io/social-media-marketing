<template>
  <div class="rounded-2xl bg_secondary_color p-6xl shadow-sm h-[100%] data-privacy-full-height"> 
    <!-- Delete Confirmation Modal -->
    <ConfirmDataDeletionModal
      :open="showDeleteModal"
      title="Confirm Data Deletion"
      description="To keep your account secure, we've sent a 6-digit verification code to your registered email address. Please enter it below to permanently delete all stored data."
      @close="showDeleteModal = false"
      @delete="handleDeleteData"
      @resend="handleResendCode"
    />

    <!-- Success Toast Notification -->
    <SuccessToastNotification
      :open="showSuccessToast"
      main-message="Your account and all data have been permanently deleted."
      secondary-message="You'll be signed out shortly."
      @close="showSuccessToast = false"
    />

    <!-- Header -->
    <h2 class="heading_h6_bold primary_text_color">Data & Privacy Settings</h2>
    <p class="label_1_regular secondary_text_color mt-md">
      Manage how your personal and brand data is stored and used.
    </p>

    <!-- Delete your data -->
    <div class="flex flex-col md:flex-row items-start md:justify-between gap-4xl mt-10xl">
      <div class="flex-1">
        <h3 class="label_1_semibold primary_text_color">Delete your data</h3>
        <p class="label_1_regular secondary_text_color mt-md">
          Permanently remove all account data.
        </p>
      </div>
      <button
        @click="showDeleteModal = true"
        class="p-xl px-xxl rounded-lg border border-black-200 bg_secondary_color label_1_semibold  primary_text_color hover:bg-gray-25"
      >
        Delete My Data
      </button>
    </div>

    <!-- AI Content Learning -->
    <div class="flex flex-row-reverse  md:flex-row items-start md:justify-between gap-4xl mt-10xl">
      <div class="flex-1">
        <h3 class="label_1_semibold primary_text_color">AI Content Learning</h3>
        <p class="label_1_regular secondary_text_color mt-md">
          Allow AI learning from content:
        </p>
      </div>
      <button
        @click="aiContentLearning = !aiContentLearning"
        type="button"
        class="relative inline-flex h-6 w-11 items-center rounded-full  "
        :class="aiContentLearning ? ' bg-green-300' : 'bg-gray-50'"
      >
        <span
          class="inline-block h-5 w-5 transform rounded-full bg_secondary_color transition-transform"
          :class="aiContentLearning ? 'translate-x-5' : 'translate-x-1'"
        ></span>
      </button>
    </div>

    <!-- Analytics Sharing -->
    <div class="flex flex-row-reverse  md:flex-row items-start md:justify-between gap-4xl mt-10xl">
      <div class="flex-1">
        <h3 class="label_1_semibold primary_text_color">Analytics Sharing</h3>
        <p class="label_1_regular secondary_text_color mt-md">
          Share analytics for improvements:
        </p>
      </div>
      <button
        @click="analyticsSharing = !analyticsSharing"
        type="button"
        class="relative inline-flex h-6 w-11 items-center rounded-full "
        :class="analyticsSharing ? 'bg-green-300' : 'bg-gray-50'"
      >
        <span
          class="inline-block h-5 w-5 transform rounded-full bg_secondary_color transition-transform"
          :class="analyticsSharing ? 'translate-x-5' : 'translate-x-1'"
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ConfirmDataDeletionModal from "./ConfirmDataDeletionModal.vue";
import SuccessToastNotification from "../../common/SuccessToastNotification.vue";

const aiContentLearning = ref(true);
const analyticsSharing = ref(false);
const showDeleteModal = ref(false);
const showSuccessToast = ref(false);

const handleDeleteData = (code) => {
  // Handle data deletion logic here
  console.log("Deleting data with code:", code);
  // You can add API call here
  // Note: Don't close the modal here - the modal will close itself after showing "Deleting..." for 2 seconds
  
  // Show success toast after deletion
  setTimeout(() => {
    showSuccessToast.value = true;
  }, 2100); // Show toast after modal closes (2 seconds + small delay)
};

const handleResendCode = () => {
  // Handle resend code logic here
  console.log("Resending verification code");
  // You can add API call here
};
</script>


