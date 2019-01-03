import {auth} from '@/fire.js'
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import About from '@/views/About.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about/:nameprivate',
      name: 'About',
      component: About,
      meta: { // ENTRAR CON AUTENTICACION
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

  router.beforeEach((to, from, next) => {
    //return next()
    const currentUser = auth.currentUser;
    //console.log(currentUser)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    //console.log(requiresAuth)

    //console.log(requiresAuth && !currentUser)
    //console.log(!requiresAuth && currentUser)
    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else if (!requiresAuth && currentUser) next('about');
    else next();
  });

  export default router;

 /* mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    //{
    //  path: '/about',
    //  name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ // './views/About.vue')
    //},  asi tal cual*/
    /*
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    } 
  ] 
}) */
