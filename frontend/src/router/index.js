import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserManagement.vue')
    },

    {
      path: '/users/:id',
      name: 'user_detail',
      component: () => import('@/views/UserDetail.vue')
    },
  ],
})

export default router
