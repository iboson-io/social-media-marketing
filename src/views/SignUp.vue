 <template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg_secondary_color ">
    <BrandingSection />
    <SignupForm />
  </div>
</template>




<script setup>
    import BrandingSection from "../components/Auth/BrandingSection.vue";
    import SignupForm from "../components/Auth/SingupForm.vue";
</script>