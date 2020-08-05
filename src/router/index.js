import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home' ;

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
    redirect:{
      path:'/app'
    }
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/app',
    component:  () => import(/* webpackChunkName: "about" */ '../views/In.vue'),
    children:[

      {
        path:'',
        name:'app-home',
        component: () => import('../views/App/AppHome.vue')
      },
      {
        path:'sell',
        name:'sell',
        component: () => import('../views/App/Sell.vue')
      },
    ]
  },

  {
    path:'/auth',
    component: ()=> import(/* webpackChunkName: "about" */ '../views/Authorization.vue'),
    children:[
      {
        path:'',
        name:'sign-in',
        component: () => import('../components/Auth/SignIn.vue')
      },
      {
        path:'change',
        name:'change-password',
        component:() => import('../components/Auth/ChangePassword.vue')
      },
      {
        path:'reset-password',
        name:'reset-password',
        component: () => import('../components/Auth/ResetPassword.vue')
      },
      {
        path:'forgot-password',
        name:'forgot-password',
        component:() => import('../components/Auth/ForgotPassword.vue')
      },
      {
        path:'/sign-out',
        name:'sign-out',
        component: () => import('../views/App/Sell.vue')
      }
    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
