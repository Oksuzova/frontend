<template>
  <div class="card m-6">
    <header class="card-header">
      <p class="card-header-title is-small">
        <router-link :to="`/posts/${post.author.username}`">@{{ post.author.username }}</router-link>
      </p>
    </header>
    <div class="card-content">
      <div class="content">{{ post.content }}
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item is-left">
        <small>
          <time datetime="2016-1-1">created: {{ created }}</time>
        </small>
      </p>
      <p class="card-footer-item is-left">
        <small>likes: {{ post.likes }}</small>
      </p>
      <p class="card-footer-item is-right" v-if="this.likable">
        <b-icon
          v-on:click="action_like"
          pack="fa"
          icon="heart"
          :type="{'is-danger': post.is_liked}">
        </b-icon>
      </p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'PostCard',
  emits: ['action_like'],
  props: {
    post: {
      type: Object,
      required: true
    },
    likable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    created: function () {
      // format 2025-01-09T20:04:38.631079
      return new Date(this.post.created_at).toLocaleString();
    }
  },
  methods: {
    action_like: function () {
      let text = ''
      let inc = 0;
      if (this.post.is_liked) {
        text = "You dislike this post"
        inc = -1
      } else {
        text = "You like this post"
        inc = 1
      }
      this.$buefy.toast.open({
        message: text,
        type: 'is-success',
        duration: 1000
      })
      this.post.is_liked = !this.post.is_liked;
      this.post.likes += inc;
      this.$emit('action_like', {
        'id': this.post.id,
        'username': this.post.author.username,
        'value': this.post.is_liked
      })

    }
  }
};
</script>
