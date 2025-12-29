<template>
  <div class="mx-auto max-w-5xl text-center">
    <div class="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400"></div>

    <h1 class="text-2xl font-semibold">Good Afternoon, Cliff</h1>

    <h2 class="mt-2 text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
      How can I help your brand today?
    </h2>

    <PromptBox />
    <ExampleCards />
  </div>
</template>

<script setup>
import PromptBox from "../../components/Dashboard/PromptBox.vue";
import ExampleCards from "../../components/Dashboard/ExampleCards.vue";
</script>
