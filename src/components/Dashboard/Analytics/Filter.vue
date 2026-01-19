<template>
  <section>
    <!-- Header -->
    <div class="bg_white common_inner_gap rounded-xl primary_border_color">
      <h2 class="heading_h6_bold">Analytics</h2>
      <p class="label_1_regular regular_gap">
        Track engagement, reach, and performance across all your connected platforms.
      </p>
    </div>

    <!-- Tabs and Dropdowns -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg_white px-3 py-3 md:px-8 rounded-2xl primary_border_color common_gap">
      
      <!-- Tabs -->
      <div class="flex gap-2 ">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="emit('update:activeTab', tab)"
          :class="props.activeTab === tab ? 'bg_white' : 'bg_primary_color'"
          class="px-4 py-1 rounded-full primary_border_color label_2_semibold"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Dropdowns -->
      <div class="flex gap-4 md:gap-8 justify-center">
        <!-- Products Dropdown -->
        <div class="flex items-center gap-3">
          <img :src="ProductIcon" alt="" class="mr-[-40px] md:mr-[-42px] z-10">
          <div class="relative product-dropdown-container">
            <button
              @click="toggleProductDropdown"
              class="flex items-center gap-2 rounded-md primary_border_color pl-8 pr-8 md:h-10 md:pl-10 md:pr-10 py-2 label_2_medium bg_white product-select relative"
            >
              <span class="product-text">{{ getProductDisplayText() }}</span>
              <img :src="DownArrow" alt="" class="absolute right-3 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            </button>
            
            <!-- Products Dropdown Panel -->
            <div
              v-if="isProductDropdownOpen"
              class="absolute top-full left-0 mt-2 bg_white rounded-md primary_border_color shadow-lg z-50 min-w-[155px] lg:min-w-[190px]"
              @click.stop
            >
              <div class="py-2">
                <label
                  class="flex items-center gap-3 px-4 py-2 "
                >
                  <input
                    type="checkbox"
                    :checked="selectedProducts.length === 0"
                    @change="toggleAllProducts"
                    class="w-4 h-4 rounded cursor-pointer custom-checkbox"
                  />
                  <span class="label_2_medium">All products</span>
                </label>
                <label
                  v-for="product in products"
                  :key="product"
                  class="flex items-center gap-3 px-4 py-2 "
                >
                  <input
                    type="checkbox"
                    :value="product"
                    v-model="selectedProducts"
                    @change="handleProductChange"
                    class="w-4 h-4 rounded cursor-pointer custom-checkbox"
                  />
                  <span class="label_2_medium">{{ product }}</span>
                </label>
              </div>
              <div class="px-3 pb-2">
              <button
                @click="applyProductFilter"
                class="w-full primary_add_button py-2 px-4 rounded-b-md"
              >
                Apply
              </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Platforms Dropdown -->
        <div class="flex items-center gap-3">
          <img :src="ProductIcon" alt="" class="mr-[-40px] md:mr-[-42px] z-10">
          <div class="relative platform-dropdown-container">
            <button
              @click="togglePlatformDropdown"
              class="flex items-center gap-2 rounded-md primary_border_color pl-8 pr-8 md:pl-10 md:pr-10 md:h-10 lg:pr-10 py-2 label_2_medium bg_white product-select relative"
            >
              <span class="product-text">{{ getPlatformDisplayText() }}</span>
              <img :src="DownArrow" alt="" class="absolute right-3 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            </button>
            
            <!-- Platforms Dropdown Panel -->
            <div
              v-if="isPlatformDropdownOpen"
              class="absolute top-full left-0 mt-2 bg_white rounded-md primary_border_color shadow-lg z-50 min-w-[155px] lg:min-w-[190px]"
              @click.stop
            >
              <div class="py-2">
                <label
                  class="flex items-center gap-3 px-4 py-2"
                >
                  <input
                    type="checkbox"
                    :checked="selectedPlatforms.length === 0"
                    @change="toggleAllPlatforms"
                    class="w-4 h-4 rounded cursor-pointer custom-checkbox"
                  />
                  <span class="label_2_medium">All platforms</span>
                </label>
                <label
                  v-for="platform in platforms"
                  :key="platform"
                  class="flex items-center gap-3 px-4 py-2"
                >
                  <input
                    type="checkbox"
                    :value="platform"
                    v-model="selectedPlatforms"
                    @change="handlePlatformChange"
                    class="w-4 h-4 rounded cursor-pointer custom-checkbox"
                  />
                  <span class="label_2_medium">{{ platform }}</span>
                </label>
              </div>
              <div class="px-3 pb-2">
              <button
                @click="applyPlatformFilter"
                class="w-full primary_add_button py-2 px-4 rounded-b-md"
              >
                Apply
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductIcon from "../../../assets/images/ProductIcon.svg"
import DownArrow from "../../../assets/images/DownArrow.svg"

const props = defineProps({
  activeTab: {
    type: String,
    default: 'Month'
  }
});

const emit = defineEmits(['update:activeTab']);

const tabs = ['Day', 'Week', 'Month', 'Custom'];

const products = ['Product One', 'Product Two', 'Product Three', 'Product four'];
const selectedProducts = ref([]);
const appliedProducts = ref([]);
const isProductDropdownOpen = ref(false);

const platforms = ['Instagram', 'Facebook', 'Twitter'];
const selectedPlatforms = ref([]);
const appliedPlatforms = ref([]);
const isPlatformDropdownOpen = ref(false);

const toggleProductDropdown = () => {
  isProductDropdownOpen.value = !isProductDropdownOpen.value;
  if (isProductDropdownOpen.value) {
    isPlatformDropdownOpen.value = false;
    // Sync selected with applied when opening
    selectedProducts.value = [...appliedProducts.value];
  }
};

const togglePlatformDropdown = () => {
  isPlatformDropdownOpen.value = !isPlatformDropdownOpen.value;
  if (isPlatformDropdownOpen.value) {
    isProductDropdownOpen.value = false;
    // Sync selected with applied when opening
    selectedPlatforms.value = [...appliedPlatforms.value];
  }
};

const applyProductFilter = () => {
  appliedProducts.value = [...selectedProducts.value];
  isProductDropdownOpen.value = false;
};

const applyPlatformFilter = () => {
  appliedPlatforms.value = [...selectedPlatforms.value];
  isPlatformDropdownOpen.value = false;
};

const getProductDisplayText = () => {
  if (appliedProducts.value.length === 0) {
    return 'All products';
  }
  if (appliedProducts.value.length === 1) {
    return appliedProducts.value[0];
  }
  return `${appliedProducts.value.length} products`;
};

const getPlatformDisplayText = () => {
  if (appliedPlatforms.value.length === 0) {
    return 'All platforms';
  }
  if (appliedPlatforms.value.length === 1) {
    return appliedPlatforms.value[0];
  }
  return `${appliedPlatforms.value.length} platforms`;
};

const toggleAllProducts = (event) => {
  if (event.target.checked) {
    selectedProducts.value = [];
  } else {
    selectedProducts.value = [...products];
  }
};

const toggleAllPlatforms = (event) => {
  if (event.target.checked) {
    selectedPlatforms.value = [];
  } else {
    selectedPlatforms.value = [...platforms];
  }
};

const handleProductChange = () => {
  // If all products are selected, automatically uncheck "All products" is handled by the checked condition
};

const handlePlatformChange = () => {
  // If all platforms are selected, automatically uncheck "All platforms" is handled by the checked condition
};

const handleClickOutside = (event) => {
  const productDropdown = event.target.closest('.product-dropdown-container');
  const platformDropdown = event.target.closest('.platform-dropdown-container');
  
  if (!productDropdown && isProductDropdownOpen.value) {
    isProductDropdownOpen.value = false;
  }
  if (!platformDropdown && isPlatformDropdownOpen.value) {
    isPlatformDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


