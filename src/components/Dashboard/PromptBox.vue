<template>
  <div
    class="mx-auto mt-10 max-w-3xl rounded-xl bg-gradient-to-r from-[#CD519D] to-[#7950F2] p-[1px] shadow-lg"
  >
    <div class="rounded-xl bg-white p-4">
      <!-- Prompt Input -->
      <input
        v-model="prompt"
        type="text"
        placeholder="What’s on your mind?"
        class="w-full border-none outline-none Body_2_Medium"
      />

      <!-- Toolbar -->
      <div class="mt-12 flex items-center justify-between">
        <div class="flex gap-2">
          <!-- All Products -->
          <div class="relative">
            <button
              @click="toggleProducts"
              class="flex items-center gap-2 rounded-md border border-[#DCDFE4] px-3 py-1 label_2_medium text-[#596773]"
            >
            <img :src="ProductIcon" alt="">
              {{ selectedProduct }}
              <span><img :src="DownArrow" alt=""></span>
            </button>

            <div
              v-if="showProducts"
              class="absolute left-0 top-8 z-10 w-40 rounded-md border border-[#DCDFE4] bg-white shadow"
            >
              <div
                v-for="item in products"
                :key="item"
                @click="selectProduct(item)"
                class="cursor-pointer px-3 py-2 label_2_medium text-[#596773] hover:bg-purple-50"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <!-- Add Files -->
          <label
            class="flex cursor-pointer items-center gap-2 rounded-md border border-[#DCDFE4] px-3 py-1 label_2_medium text-[#596773]"
          >
          <img :src="AttachmentIcon" alt="">
            Add files
            <input
              type="file"
              class="hidden"
              multiple
              @change="handleFiles"
            />
          </label>

          <!-- Gemini Model -->
          <div class="relative">
            <button
              @click="toggleModels"
              class="flex items-center gap-2 rounded-md border border-[#DCDFE4] px-3 py-1 label_2_medium text-[#596773]"
            >
            <img :src="GeminiIcon" alt="">
              {{ selectedModel }}
              <span><img :src="DownArrow" alt=""></span>
            </button>

            <div
              v-if="showModels"
              class="absolute left-0 top-8 z-10 w-40 rounded-md border bg-white shadow"
            >
              <div
                v-for="model in models"
                :key="model"
                @click="selectModel(model)"
                class="cursor-pointer px-3 py-2 label_2_medium text-[#596773] hover:bg-purple-50"
              >
                {{ model }}
              </div>
            </div>
          </div>
        </div>

        <!-- Mic -->
        <img :src="MikeIcon" alt="">
      </div>

      <!-- Selected Files Preview (Optional UI) -->
      <div v-if="files.length" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="file in files"
          :key="file.name"
          class="rounded bg-gray-100 px-2 py-1 label_2_medium text-[#596773]"
        >
          {{ file.name }}
        </span>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductIcon from "../../assets/images/ProductIcon.svg";
import AttachmentIcon from "../../assets/images/AttachmentIcon.svg"
import GeminiIcon from "../../assets/images/GeminiIcon.svg"
import DownArrow from "../../assets/images/DownArrow.svg"
import MikeIcon from "../../assets/images/MikeIcon.svg"

/* Prompt */
const prompt = ref("");

/* Products */
const products = ["All products", "Instagram", "LinkedIn", "Twitter"];
const selectedProduct = ref("All products");
const showProducts = ref(false);

/* Models */
const models = ["Gemini 2.5 pro", "Gemini 2.0", "GPT-4"];
const selectedModel = ref("Gemini 2.5 pro");
const showModels = ref(false);

/* Files */
const files = ref([]);

/* Methods */
const toggleProducts = () => {
  showProducts.value = !showProducts.value;
  showModels.value = false;
};

const toggleModels = () => {
  showModels.value = !showModels.value;
  showProducts.value = false;
};

const selectProduct = (item) => {
  selectedProduct.value = item;
  showProducts.value = false;
};

const selectModel = (model) => {
  selectedModel.value = model;
  showModels.value = false;
};

const handleFiles = (e) => {
  files.value = Array.from(e.target.files);
  console.log("Uploaded files:", files.value);
};
</script>
