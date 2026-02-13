<template>
  <!-- Initial View (No Messages) -->
  <main
    v-if="!hasMessages"
    class="flex items-center flex-1 bg_primary_color px-6xl py-10xl"
  >
    <div class="mx-auto max-w-5xl text-center">
      <div
        class="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400"
      ></div>

      <h4
        class="primary_text_color heading_h5_semibold md:heading_h4_semibold"
      >
        Good Afternoon, Cliff
      </h4>
      <span class=" heading_h4_semibold gradient_text_color">How can I help your brand today?</span>



      <div class="block md:hidden">
     <p class="lebel_2_semibold text-start primary_text_color mt-14xl">
      Start with the example below
    </p>
    <div class="flex gap-md mb-[-2.5em] py-xxl overflow-auto hide-scrollbar">
    <div class="cursor-pointer px-xl py-xxl gap-xl items-center bg_secondary_color rounded-lg flex shrink-0"> <img :src="HomeIcon" alt="" class="w-6 h-6"><span class="label_2_semibold primary_text_color">Set Up Your Brand</span></div>
    <div class="cursor-pointer px-xl py-xxl gap-xl items-center bg_secondary_color rounded-lg flex shrink-0"> <img :src="DateIcon" alt="" class="w-6 h-6"><span class="label_2_semibold primary_text_color">Set Up Your Brand</span></div>
    <div class="cursor-pointer px-xl py-xxl gap-xl items-center bg_secondary_color rounded-lg flex shrink-0"> <img :src="GalleryIcon" alt="" class="w-6 h-6"><span class="label_2_semibold primary_text_color">Set Up Your Brand</span></div>
   </div>
   </div>
 
      <PromptBox @send-message="handleFirstMessage" />
      <Cards />
          <p class="body_4_regular secondary_text_color  block lg:hidden absolute left-0 right-0 bottom-7xl">Genius AI can make mistakes. Please check for accuracy.</p>
    </div>
  </main>

  <!-- Chat Page (With Messages) -->
  <ChatPage v-else :initial-messages="messages" :isSidebarCollapsed="isSidebarCollapsed" ref="chatPageRef" class="flex-1" />
</template>

<script setup>
import { ref, watch } from "vue";
import PromptBox from "../components/Dashboard/PromptBox.vue";
import Cards from "../components/Dashboard/Cards.vue";
import ChatPage from "../components/Dashboard/Chat/ChatPage.vue";
import HomeIcon from "../assets/images/HomeIcon.svg"
import DateIcon from "../assets/images/DateIcon.svg"
import GalleryIcon from "../assets/images/GalleryIcon.svg"

const props = defineProps({
  resetChat: {
    type: Boolean,
    default: false
  },
  isSidebarCollapsed: {
    type: Boolean,
    default: false
  }
});

const hasMessages = ref(false);
const messages = ref([]);
const chatPageRef = ref(null);

const emit = defineEmits(['reset-complete']);

// Watch for resetChat prop changes
watch(() => props.resetChat, (newVal) => {
  if (newVal) {
    handleNewChat();
    // Reset the flag after handling
    emit('reset-complete');
  }
});

const handleFirstMessage = (messageData) => {
  // Add the first message
  messages.value = [
    {
      text: messageData.text,
      product: messageData.product,
      model: messageData.model,
      files: messageData.files,
      isLoading: true,
      aiResponse: null
    }
  ];
  
  hasMessages.value = true;
  
  // Show loading for 3 seconds, then show dummy messages
  setTimeout(() => {
    if (messages.value[0]) {
      messages.value[0].isLoading = false;
      messages.value[0].aiResponse = "Great! ✨ Let's set up your brand. You can share your <strong>website</strong>, upload <strong>brand documents</strong>, or simply describe your <strong>products</strong> and style here in the chat. I'll use this info to understand your brand's tone, personality, and style.";
      
      // Add second dummy message after a short delay
      setTimeout(() => {
        messages.value.push({
          text: "",
          isLoading: false,
          aiResponse: "I've created a product using your brand details. You can edit the name, logo, colors, or fonts anytime in the <strong>Products section</strong>.",
          isUser: false,
          product: null,
          model: null,
          files: []
        });
      }, 500);
    }
  }, 3000);
};

const handleNewChat = () => {
  hasMessages.value = false;
  messages.value = [];
};
</script>

