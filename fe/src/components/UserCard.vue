<!-- UserCard.vue -->
<template>
 <div class="card m-2">
  <div class="card-content">
    <p class="title">
     {{user.full_name}}
    </p>
    <p class="subtitle">@{{ user.username }}</p>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>Posted: {{user.posts}}</span>
    </p>
    <p class="card-footer-item">
      <span><router-link :to="`/posts/${user.username}`">see all posts</router-link></span>
    </p>
  </footer>
</div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
