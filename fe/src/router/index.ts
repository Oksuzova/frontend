import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import UsersPostView from '../views/UsersPostView.vue'
import authService from "@/store/auth.ts";
import IAMPost from "@/views/IAMPost.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true},
    },
    {
      path: '/me',
      name: 'iam',
      component: IAMPost,
      meta: {requiresAuth: true},
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: {requiresAuth: true},
    },
    {
      path: '/posts/:user',
      name: 'users_post',
      component: UsersPostView,
      meta: {requiresAuth: true},
      props: true
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})
export default router
