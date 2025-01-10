import 'buefy/dist/buefy.css'
import Buefy from 'buefy'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import {faHeart, faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHeart, faArrowUp, faArrowDown);

const app = createApp(App)
app.component('vue-fontawesome', FontAwesomeIcon);
app.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})
app.use(router)

app.mount('#app')
