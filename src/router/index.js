import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import RequestPasswordView from '@/views/RequestPasswordView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import AppLayout from '@/components/AppLayout.vue';
import useAuthStore from '@/stores/Auth';
import DashBoardView from '@/views/DashBoardView.vue';
import ProductsView from '@/views/Products/ProductsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'app',
      component: AppLayout,
      meta: {
        auth: true
      },
      children:[
        {
          path: 'dashboard',
          name: 'app.dashboard',
          component: DashBoardView
        },
        {
          path: 'products',
          name: 'app.products',
          component: ProductsView
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        guest: true
      }
    },
    {
      path: '/request-password',
      name: 'requestPassword',
      component: RequestPasswordView,
      meta: {
        guest: true
      }
    },
    {
      path: '/reset-password/:token',
      name: 'resetPassword',
      component: ResetPasswordView,
      meta: {
        guest: true
      }
    },
    {
      path:'/:catchAll(.*)',
      name:'not-found',
      component: NotFoundView
    }
  ]
})


router.beforeEach( async(to, from, next)=>{

  // get authenticated user if there is stored token
  if(!useAuthStore().user && localStorage.getItem('token')){
     await useAuthStore().getUser();
  }

  // if not authenticated
  if(to.meta.auth && !useAuthStore().user){
     return next({ name:'login' });
  }

  // if authenticated
  if(to.meta.guest && useAuthStore().user){
    return next({ name:'app.dashboard' });
 }

  next();
});

export default router
