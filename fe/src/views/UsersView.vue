<!-- UserView.vue -->
<template>
  <Suspense>
    <NaviBar/>
  </Suspense>
  <div class="container">
    <div class="columns">
      <section class="section column is-half">
        <h1 class="title">Users</h1>
        <h2 class="subtitle">looking someone interesting </h2>
      </section>
      <section class="section column is-half">
        <b-field label="try find" horizontal>
          <b-input v-model="name" placeholder="enter username..."></b-input>
        </b-field>
      </section>
    </div>
    <UserCard v-for="(user, index) in filtered_users" :key="index" :user="user"/>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import UserCard from '@/components/UserCard.vue';
import NaviBar from '@/components/NaviBar.vue';
import {UserRepo} from "@/store/users.ts";

export default {
  name: 'UsersView',
  components: {
    UserCard,
    NaviBar
  },
  setup() {
    const users = ref([]);
    const name = ref('');
    const fetchUsers = async () => {
      const response = await UserRepo.users();
      users.value = response;
    };
    const filtered_users = computed(() => {
      if (name.value.trim() === '') {
        return users.value;
      } else {
        return users.value.filter(user =>
          user.username.toLowerCase().includes(name.value.toLowerCase())
        );
      }


    });
    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      filtered_users,
      name
    };
  }
};
</script>
