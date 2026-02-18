<template>
  <div class="rounded-2xl bg_secondary_color p-6xl shadow-sm h-[100%] data-privacy-full-height">
    <!-- Header -->
    <h2 class="heading_h6_semibold primary_text_color">Localization</h2>
    <p class="label_1_regular secondary_text_color mt-md">
      Set your preferred language, region, and time format.
    </p>

    <!-- Settings Fields -->
    <div class="mt-10xl">
      <!-- Interface Language -->
      <div class="">
        <label class="label_1_bold primary_text_color flex-shrink-0">
          Interface Language:
        </label>
        <div class="relative flex items-center rounded-lg w-full mt-md md:w-[70%] overflow-visible">
          <select
            v-model="localizationSettings.interfaceLanguage"
            class="w-full appearance-none rounded-md regular_border_color px-xl py-xxl label_2_medium primary_text_color bg_secondary_color focus-visible:outline-none focus-visible:ring-0"
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
          <!-- Chevron -->
          <img :src="DownArrow" alt="" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2">
        </div>
      </div>

      <!-- Region -->
      <div class="mt-10xl">
        <label class="label_1_bold primary_text_color flex-shrink-0">
          Region:
        </label>
        <div class="relative flex items-center rounded-lg w-full mt-md md:w-[70%] overflow-visible">
          <select
            v-model="localizationSettings.region"
            class="w-full appearance-none rounded-md regular_border_color px-xl py-xxl label_2_medium primary_text_color bg_secondary_color focus-visible:outline-none focus-visible:ring-0"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
          </select>
          <!-- Chevron -->
          <img :src="DownArrow" alt="" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2">
        </div>
      </div>

      <!-- Time Format -->
      <div class="mt-10xl">
        <label class="label_1_bold primary_text_color flex-shrink-0">
          Time Format:
        </label>
        <div class="relative flex items-center rounded-lg w-full mt-md md:w-[70%] overflow-visible">
          <select
            v-model="localizationSettings.timeFormat"
            class="w-full appearance-none rounded-md regular_border_color px-xl py-xxl label_2_medium primary_text_color bg_secondary_color focus-visible:outline-none focus-visible:ring-0"
          >
            <option value="24-hour">24-hour</option>
            <option value="12-hour">12-hour</option>
          </select>
          <!-- Chevron -->
          <img :src="DownArrow" alt="" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2">
        </div>
      </div>

      <!-- Timezone -->
      <div class="mt-10xl">
        <label class="label_1_bold primary_text_color flex-shrink-0">
          Timezone:
        </label>
        <div class="relative flex items-center rounded-lg w-full mt-md md:w-[70%] overflow-visible">
          <select
            v-model="localizationSettings.timezone"
            class="w-full appearance-none rounded-md regular_border_color px-xl py-xxl label_2_medium primary_text_color bg_secondary_color focus-visible:outline-none focus-visible:ring-0"
          >
            <option value="(GMT+5:30) Asia/Kolkata">(GMT+5:30) Asia/Kolkata</option>
            <option value="(GMT-5:00) America/New_York">(GMT-5:00) America/New_York</option>
            <option value="(GMT+0:00) Europe/London">(GMT+0:00) Europe/London</option>
            <option value="(GMT-8:00) America/Los_Angeles">(GMT-8:00) America/Los_Angeles</option>
            <option value="(GMT+10:00) Australia/Sydney">(GMT+10:00) Australia/Sydney</option>
            <option value="(GMT+1:00) Europe/Berlin">(GMT+1:00) Europe/Berlin</option>
            <option value="(GMT+9:00) Asia/Tokyo">(GMT+9:00) Asia/Tokyo</option>
            <option value="(GMT+8:00) Asia/Shanghai">(GMT+8:00) Asia/Shanghai</option>
          </select>
          <!-- Chevron -->
          <img :src="DownArrow" alt="" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2">
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-center md:justify-end gap-4 md:gap-8 mt-10">
      <button
        @click="resetToDefault"
        class="p-md rounded-lg primary_border_color label_2_semibold md:px-xl md:py-md bg-gray-25 text_primary_color"
      >
        Reset to Default
      </button>
      <button
        @click="saveChanges"
        :disabled="!hasChanges"
        class="p-md rounded-lg primary_button md:px-xl md:py-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Ensure select dropdowns open at the bottom */
select {
  position: relative;
  z-index: 1;
}

/* Ensure parent containers don't clip dropdowns */
.relative {
  z-index: 0;
}

select:focus {
  z-index: 10;
}
</style>

<script setup>
import { reactive, computed } from 'vue';
import DownArrow from "../../../assets/images/DownArrow.svg";

// Initial values (snapshot of original state)
const initialValues = {
  interfaceLanguage: 'English (US)',
  region: 'India',
  timeFormat: '24-hour',
  timezone: '(GMT+5:30) Asia/Kolkata',
};

// Localization settings state
const localizationSettings = reactive({
  interfaceLanguage: initialValues.interfaceLanguage,
  region: initialValues.region,
  timeFormat: initialValues.timeFormat,
  timezone: initialValues.timezone,
});

// Default values for reset functionality
const defaultValues = {
  interfaceLanguage: 'English (US)',
  region: 'India',
  timeFormat: '24-hour',
  timezone: '(GMT+5:30) Asia/Kolkata',
};

// Check if any changes have been made
const hasChanges = computed(() => {
  return (
    localizationSettings.interfaceLanguage !== initialValues.interfaceLanguage ||
    localizationSettings.region !== initialValues.region ||
    localizationSettings.timeFormat !== initialValues.timeFormat ||
    localizationSettings.timezone !== initialValues.timezone
  );
});

const resetToDefault = () => {
  Object.assign(localizationSettings, defaultValues);
  // Update initial values to match default after reset
  Object.assign(initialValues, defaultValues);
  // Here you would typically make an API call to reset settings
};

const saveChanges = () => {
  // Here you would typically make an API call to save the changes
  console.log('Saving localization settings:', localizationSettings);
  // Update initial values to match current values after save
  Object.assign(initialValues, { ...localizationSettings });
};
</script>

