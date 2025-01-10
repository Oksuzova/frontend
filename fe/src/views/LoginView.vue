<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import LoginForm from '@/components/LoginForm.vue';
import Logo from '@/components/Logo.vue'
import {onMounted} from "vue";
import authService from "@/store/auth.ts";
import router from "@/router";

onMounted(() => {
      if (authService.isAuthenticated()) {
        router.push('/');
      }
    });
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
    <LoginForm></LoginForm>
  </div>
</div>
  </div>
</section>
    </main>
</template>
