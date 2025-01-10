<template>
  <section class="container">
    <b-collapse
      class="card"
      animation="slide"
      aria-id="contentIdForA11y3"
      v-model="is_open">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
          :aria-expanded="props.is_open">
          <p class="card-header-title">
            new post
          </p>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <b-input
            type="textarea"
            v-model="post_text"
            :maxlength="maxLength"
            placeholder="thinking..."
            rows="3"
            :resize="false"
          ></b-input>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="send">post</a>
        <a class="card-footer-item" @click="clear">clear</a>
      </footer>
    </b-collapse>
  </section>
</template>

<script>
import {ref} from 'vue';
import {UserRepo} from "@/store/users.ts";

export default {
  name: "NewPostForm",
  emits: ['new_post'],
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const is_open = ref(false);
    const post_text = ref('');
    const username = ref(props.user)
    const maxLength = 150;


    const hide = () => {
      is_open.value = false;
    };

    const send = async () => {
      if (post_text.value.length > 0 && post_text.value.length <= maxLength) {
        let resp = await UserRepo.user_create_posts(post_text.value, username.value);
        if (resp.op){
          emit('new_post')
          clear()
          hide();
        }else{
          console.log(resp)
        }

      }
    };
    const clear = () => {
     post_text.value = '';
    };

    return {
      post_text,
      is_open,
      send,
      clear,
      maxLength
    };
  },
};
</script>
<style scoped>
</style>
