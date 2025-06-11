import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'DashboardLayout', title: 'Pizza IS - Home' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { layout: 'DashboardLayout', title: 'About' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'PlainLayout', title: 'Pizza IS - Login' },
      beforeEnter: (to, from) => {
        if (useAuthStore().authenticated) {
          return { name: 'home' }
        }
      },
    }
  ],
})

router.beforeEach(async (to, from) => {
  document.title = to.meta.title || 'Default Title';

  // make sure the user is authenticated and avoid an infinite redirect
  if (!useAuthStore().authenticated && to.name !== 'login') {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
