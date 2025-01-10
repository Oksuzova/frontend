<script setup lang="ts">
  import RegisterForm from '@/components/RegisterForm.vue'
  import Logo from "@/components/Logo.vue";
</script>
<template>
   <main class="has-background-success-light">
  <section>
  <div class="container">
<div class="columns is-centered">
  <div class="column is-narrow">
    <Logo></Logo>
  </div>
  <div class="column is-narrow">
    <RegisterForm></RegisterForm>
  </div>
</div>
  </div>
</section>
    </main>
</template>
