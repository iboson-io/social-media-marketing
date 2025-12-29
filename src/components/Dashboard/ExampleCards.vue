<template>
  <div class="mt-10">
    <p class="mb-4 text-left text-sm text-gray-500">
      Start with the example below
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        title="Set Up Your Brand"
        desc="Let me learn your brand's style, tone, and personality."
      />
      <Card
        title="Plan Weekly Posts"
        desc="AI suggests days, times, and post ideas."
      />
      <Card
        title="Create Social Media Posts"
        desc="AI generates engaging posts and captions."
      />
    </div>
  </div>
</template>

<script setup>
const Card = {
  props: ["title", "desc"],
  template: `
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-3 h-8 w-8 rounded-lg bg-purple-100"></div>
      <h3 class="font-semibold text-gray-900">{{ title }}</h3>
      <p class="mt-2 text-sm text-gray-500">{{ desc }}</p>
    </div>
  `,
};
</script>
