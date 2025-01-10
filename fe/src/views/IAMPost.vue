<!-- UserView.vue -->
<template>
  <Suspense>
    <NaviBar/>
  </Suspense>
  <div class="container">
    <div class="columns">
      <section class="section column is-four-fifths">
        <h1 class="title">@{{ username }}</h1>
        <h2 class="subtitle"></h2>
      </section>
    </div>
    <NewPostForm v-if="username" :user="username" @new_post="update"></NewPostForm>
    <PostCard v-for="(post, index) in posts" :key="index" :post="post" :likable="false"/>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import NaviBar from '@/components/NaviBar.vue';
import {UserRepo} from "@/store/users.ts";
import PostCard from "@/components/PostCard.vue";
import NewPostForm from "@/components/NewPostForm.vue";

export default {
  name: 'IAMPost',
  components: {
    NewPostForm,
    PostCard,
    NaviBar
  },
  setup() {
    const user = ref(null)
    const posts = ref([])
    const username=ref(null)

    const fetchPosts = async () => {
      posts.value = await UserRepo.user_posts(user.value.username);
    };
    const fetchIam = async () => {
      user.value = await UserRepo.me();
      username.value = user.value.username;
    };

    const update = async () => {
      await fetchPosts();
    }
    onMounted(async () => {
      await fetchIam();
      await fetchPosts();

    });
    return {
      posts,
      username,
      update,
    };
  }
};
</script>
