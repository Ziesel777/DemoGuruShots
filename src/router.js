import Vue from 'vue'
import Router from 'vue-router'

//Header links
import Home from './views/Home.vue'
import Discover from './views/Discover.vue'
import Articles from './views/Articles.vue'
import Exhibitions from './views/Exhibitions.vue'
import Partners from './views/Partners.vue'

//Footer links
import FAQ from './views/footerLinks/FAQ.vue'
import Contact from './views/footerLinks/Contact.vue'
import Privacy from './views/footerLinks/Privacy.vue'
import Terms from './views/footerLinks/Terms.vue'
import PhotoContest from './views/footerLinks/Photo_contest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // ------------Header-links--------------------------
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/exhibitions',
      name: 'exhibitions',
      component: Exhibitions
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners
    },

    //-----------------Footer-links----------------------------------------------
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/footerLinks/About.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/photo_contest',
      name: 'photo-contest',
      component: PhotoContest
    },
  ],
  mode:'history'
})
