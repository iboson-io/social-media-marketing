<template>
  <div class="h-[100%]">
    <!-- Sub-navigation Tabs -->
    <div class=" flex gap-2 overflow-x-auto bg_white rounded-2xl common_inner_gap primary_border_color hide-scrollbar px-4 py-3">
      <button
        @click="$emit('update:activeTab', 'product-info')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 flex-shrink-0 label_2_semibold"
        :class="activeTab === 'product-info' ? 'bg_primary_color primary_text_color' : 'sub_text_color'"
      >
        <!-- Document Icon -->
        <img :src="ProductInfoIcon" alt="">
        <span>Product Info</span>
      </button>

      <button
        @click="$emit('update:activeTab', 'brand-colors')"
          class="flex items-center gap-2 rounded-lg px-4 py-2 flex-shrink-0 label_2_semibold"
          :class="activeTab === 'brand-colors' ? 'bg_primary_color primary_text_color' : 'sub_text_color'"
      >
        <!-- Paint Palette Icon -->
        <img :src="BrandColorIcon" alt="">
        <span>Brand Colors</span>
      </button>

      <button
        @click="$emit('update:activeTab', 'typography')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 flex-shrink-0 label_2_semibold"
        :class="activeTab === 'typography' ? 'bg_primary_color primary_text_color' : 'sub_text_color'"
      >
        <!-- Typography Icon (A) -->
        <img :src="TypographyIcon" alt="">
        <span>Typography</span>
      </button>

      <button
        @click="$emit('update:activeTab', 'tone-style')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 flex-shrink-0 label_2_semibold"
        :class="activeTab === 'tone-style' ? 'bg_primary_color primary_text_color' : 'sub_text_color'"
      >
        <!-- Sparkle/Star Icon -->
        <img :src="StyleIcon" alt="">
        <span>Tone & Style</span>
      </button>

      <button
        @click="$emit('update:activeTab', 'website-assets')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 flex-shrink-0 label_2_semibold"
        :class="activeTab === 'website-assets' ? 'bg_primary_color primary_text_color' : 'sub_text_color'"
      >
        <!-- Folder Icon -->
        <img :src="FolderIcon" alt="">
        <span>Website & Brand Assets</span>
      </button>
    </div>
    <div class="common_gap h-[83%] md:h-[88%] lg:h-[83%]">
    <!-- Tab Content: Product Info -->
    <div v-if="activeTab === 'product-info'" class="h-[100%]">
      <BrandInfoFields
        :product-name="productName"
        :description="description"
        @update:product-name="$emit('update:productName', $event)"
        @update:description="$emit('update:description', $event)"
      />
    </div>

    <!-- Placeholder for other tabs -->
     <div v-else-if="activeTab === 'brand-colors'" class="h-[100%]">
      <BrandColor/>
    </div>
   <!-- tab for typography -->
    <div v-else-if="activeTab === 'typography'" class="h-[100%]">
      <BrandTypography/>
    </div>
    <!-- tab for typography -->
    <div v-else-if="activeTab === 'tone-style'" class="h-[100%]">
      <BrandStyle/>
    </div>

    <div v-else>
      <p class="label_1_regular text-[#8590A2]">{{ activeTab }} content coming soon...</p>
    </div>
</div>
  </div>
</template>

<script setup>
import BrandInfoFields from "../product/BrandInfo/BrandInfoFields.vue";
import BrandColor from "../product/BrandInfo/BrandColor.vue";
import BrandTypography from "../product/BrandInfo/BrandTypography.vue"
import BrandStyle from "../product/BrandInfo/BrandStyle.vue"
import ProductInfoIcon from "../../../assets/images/ProductInfoIcon.svg" 
import BrandColorIcon from "../../../assets/images/BrandColorIcon.svg" 
import TypographyIcon from "../../../assets/images/TypographyIcon.svg" 
import StyleIcon from "../../../assets/images/StyleIcon.svg" 
import FolderIcon from "../../../assets/images/FolderIcon.svg" 

defineProps({
  activeTab: {
    type: String,
    default: "product-info",
  },
  productName: {
    type: String,
    default: "cvcbcvnb",
  },
  description: {
    type: String,
    default: "",
  },
});

defineEmits(["update:activeTab", "update:productName", "update:description"]);
</script>

