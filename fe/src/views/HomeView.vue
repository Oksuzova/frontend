<template>
  <Suspense>
    <NaviBar />
  </Suspense>
  <div class="container">
    <div class="columns">
      <section class="section column is-half">
        <h1 class="title">Posts</h1>
        <h2 class="subtitle">what another users says</h2>
      </section>
      <section class="section column is-half">
        <b-field label="find post" horizontal>
          <b-input v-model="value" placeholder="enter anything..."></b-input>
        </b-field>
      </section>
    </div>
    <PostCard v-for="(post, index) in filtered_posts" :key="index" :post="post" @action_like="likepost"/>
  </div>
</template>
<script>
import {computed, onMounted, ref} from "vue";
import NaviBar from "@/components/NaviBar.vue";
import PostCard from "@/components/PostCard.vue";
import {UserRepo} from "@/store/users.ts";
export default {
  name: 'HomeView',
  components: {
    PostCard,
    NaviBar
  },
  setup() {
    const users = ref([]);
    const posts = ref([]);
    const value = ref('');

    const fetchUsers = async () => {
      const response = await UserRepo.users();
      users.value = response;
    };

    const fetchPosts = async () => {
      for (const user of users.value) {
        const response = await UserRepo.user_posts(user.username)
        posts.value.push(...response);
      }
    };
    const likepost = async (post) => {
      if (post.value){
        await UserRepo.user_like_post(post.username, post.id)
      }else {
        await UserRepo.user_dislike_post(post.username, post.id)
      }

    }
    const filtered_posts = computed(() => {
      let search = value.value.toLowerCase()
      if (search.trim() === '') {
        return posts.value;
      } else {
        return posts.value.filter(post =>
          post.content.toLowerCase().includes(search) ||
          post.author.username.toLowerCase().includes(search) ||
          post.author.full_name?.toLowerCase().includes(search)
        );
      }

    });

    onMounted(async () => {
      await fetchUsers();
      await fetchPosts();
    });
    return {
      filtered_posts, value, likepost
    }
  }
}
</script>
