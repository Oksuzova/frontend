<template>
  <section>
    <form @submit.prevent="submit">
      <b-field required label="Username" label-for="username" :type="{'is-danger': username.error}"
               :message="username.error">
        <b-input type="text" name="username" v-model="username.value" v-on:update:modelValue="clear_errors"></b-input>
      </b-field>
      <b-field required label="Password" label-for="password" :type="{'is-danger': password.error}"
               :message="password.error">
        <b-input type="password" name="password" v-model="password.value"
                 v-on:update:modelValue="clear_errors"></b-input>
      </b-field>
      <div class="is-grouped">
        <b-button @click=tryLogin>Login me</b-button>

        <b-button outlined tag="a"
                  href="/signup">
          not registered?
        </b-button>
      </div>

    </form>
  </section>
</template>

<script>
import {defineComponent} from 'vue';
import login from "@/store/authApi";

export default defineComponent({
  name: 'LoginForm',

  data() {
    return {
      username: {value: '', error: ''},
      password: {value: '', error: ''}
    };
  },

  methods: {
    async tryLogin() {
      try {
        const resp = await login(this.username.value, this.password.value)
        if (resp.op) {
          console.log("vue login status OK: " + JSON.stringify(resp))
          this.$router.push({path: '/'})
        } else {
          console.log("vue login status FALSE: " + JSON.stringify(resp))
          resp.data.detail.forEach((element) => {
            this[element.loc[1]].error = element.msg;
          });
        }

      } catch (error) {
        console.log("vue login error: " + JSON.stringify(error))
        throw 'Username already exists. Please try again.';
      }
    },
    clear_errors() {
      this.username.error = '';
      this.password.error = '';
    }
  },
});
</script>
