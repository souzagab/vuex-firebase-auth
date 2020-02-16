import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import Home from '@/views/Home'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },

  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('signin')
  else next()
})

export default router
