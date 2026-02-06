<template>
  <div class="space-y-6 bg_secondary_color rounded-2xl py-7 px-4 brand_section_height primary_border_color">
    <!-- Product name field -->
    <div class="flex gap-3 flex-col justify-between md:flex-row">
      <label class="label_2_medium primary_text_color w-32 flex-shrink-0 ">
        Product name
      </label>
      <div class="w-[100%] md:w-[70%]">
        <input
          :model-value="productName"
          @input="$emit('update:productName', $event.target.value)"
          type="text"
          placeholder="Enter product name"
          class="input_box w-full inputbox_border_color"
        />
      </div>
    </div>

    <!-- Description field -->
    <div class="flex gap-3 flex-col justify-between md:flex-row">
      <label class="label_2_medium primary_text_color w-32 flex-shrink-0">
        Description
      </label>
      <div class="w-[100%] md:w-[70%]">
        <textarea
          :model-value="description"
          @input="$emit('update:description', $event.target.value)"
          placeholder="description...."
          class="input_box w-full min-h-[120px] resize-y inputbox_border_color"
          rows="4"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  productName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

defineEmits(["update:productName", "update:description"]);
</script>

