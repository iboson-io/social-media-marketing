 <template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white ">
    <BrandingSection />
    <ResetLinkSent />
  </div>
</template>




<script setup>
    import BrandingSection from "../components/Auth/BrandingSection.vue";
    import ResetLinkSent from "../components/Auth/ResetLinkSent.vue";
</script>