 <template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white ">
    <BrandingSection />
    <Password />
  </div>
</template>




<script setup>
    import BrandingSection from "../components/Auth/BrandingSection.vue";
    import Password from "../components/Auth/Password.vue";
</script>