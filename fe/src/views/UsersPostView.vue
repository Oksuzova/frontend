<!-- UserView.vue -->
<template>
  <Suspense>
    <NaviBar/>
  </Suspense>
  <div class="container">
    <div class="columns">
      <section class="section column is-half">
        <h1 class="title">All post of {{ username }}</h1>
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
import {ref, onMounted, computed} from 'vue';
import PostCard from '@/components/PostCard.vue';
import NaviBar from '@/components/NaviBar.vue';
import {UserRepo} from "@/store/users.ts";


export default {
  name: 'UsersPostView',
  components: {
    PostCard,
    NaviBar
  },
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const username = ref(props.user);
    const value = ref('');
    const posts = ref([]);
    const fetchPosts = async () => {
      posts.value = await UserRepo.user_posts(username.value)
    };
    const likepost = async (post) => {
      if (post.value) {
        await UserRepo.user_like_post(post.username, post.id)
      } else {
        await UserRepo.user_dislike_post(post.username, post.id)
      }

    }
    const filtered_posts = computed(() => {
      let search = value.value.toLowerCase()
      if (search.trim() === '') {
        return posts.value;
      } else {
        return posts.value.filter(post =>
          post.content.toLowerCase().includes(search)
        );
      }

    });

    onMounted(async () => {
      await fetchPosts();
    });

    return {
      filtered_posts,
      username,
      value,
      likepost
    };
  }
};
</script>
