<template>
  <section>
    <form @submit.prevent="submit">
      <b-field required label="Username" label-for="username" :type="{'is-danger': username.error}"
               :message="username.error">
        <b-input type="text" name="username" v-model="username.value" v-on:update:modelValue="clear_errors"></b-input>
      </b-field>
      <b-field required label="Full Name" label-for="fullname" :type="{'is-danger': fullname.error}"
               :message="fullname.error">
        <b-input type="text" name="fullname" v-model="fullname.value" v-on:update:modelValue="clear_errors"></b-input>
      </b-field>
      <b-field required label="Password" label-for="password" :type="{'is-danger': password.error}"
               :message="password.error">
        <b-input type="password" name="password" v-model="password.value" v-on:update:modelValue="clear_errors"></b-input>
      </b-field>
      <div class="is-grouped">
        <b-button @click=register>Lets write!</b-button>
        <b-button outlined tag="a"
                  href="/login">
          already register?
        </b-button>
      </div>
    </form>
  </section>
</template>
<script>
import {defineComponent} from 'vue';
import {UserRepo} from "@/store/users.ts";

export default defineComponent({
  name: 'RegisterForm',
  data() {
    return {
        username: {value: '', error: ''},
        fullname: {value: '', error: ''},
        password: {value: '', error: ''},
    }
  },
  methods: {
    async register(event) {
      try {
        const resp = await UserRepo.register(this.username.value, this.password.value, this.fullname.value)
        if (resp.op) {
          console.log("vue register status OK: " + JSON.stringify(resp))
          this.$buefy.toast.open({
                    message: 'Successfully registered!',
                    type: 'is-success',
                    duration: 1000
                })
          this.$router.push({ path: 'login' })
        } else {
          console.log("vue register status FALSE: " + JSON.stringify(resp))
          resp.data.detail.forEach((element) => {
            this[element.loc[1]].error = element.msg;
          });
        }
      } catch (error) {
        throw 'Internal error';
      }
    },
    clear_errors(){
      this.username.error = ''
      this.fullname.error = ''
      this.password.error = ''
    }
  },
});
</script>
