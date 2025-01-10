<template>
  <b-navbar :fixed-top="true" type="is-success">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img alt="Posterino" class="logo" src="@/assets/logo.svg" width="80" height="80"/>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/me">
        {{fullname}}`s posts
      </b-navbar-item>
      <b-navbar-item href="/users">
        Users
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item href="/login">
        Hello, {{username}}
      </b-navbar-item>

      <b-navbar-item @click="logout">
        Log out
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import {ref, onMounted} from 'vue';
import {UserRepo} from "@/store/users.ts";
import authService from "@/store/auth.ts";
import router from "@/router";

export default {
  name: 'NavBar',
  setup() {
    const username = ref(null);
    const fullname = ref(null);

    const logout = () => {
      authService.clearAuth()
      router.push('/login')
    };

    onMounted(async () => {
      let data = await UserRepo.me();
      username.value = data.username
      fullname.value = data.full_name ? data.full_name : "Your";
    });
    return {
      username, fullname, logout
    };
  }
};
</script>
