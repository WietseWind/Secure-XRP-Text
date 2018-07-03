import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/routes/Home'
import Sent from '@/routes/Sent'
import Composer from '@/components/Composer'

// import About from '@/routes/About'
// import AddAccount from '@/routes/AddAccount'
import AddressBook from '@/routes/AddressBook'
// import Compose from '@/routes/Compose'
// import Drafts from '@/routes/Drafts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        composer: Composer
      },
      props: {
        default: true,
        composer: false
      }
    },
    {
      path: '/sent/',
      name: 'Sent',
      components: {
        default: Sent,
        composer: Composer
      },
      props: {
        default: true,
        composer: false
      }
    },
    {
      path: '/message/:message',
      name: 'Message',
      components: {
        default: Home,
        composer: Composer
      },
      props: {
        default: true,
        composer: false
      }
    },
    // },
    // {
    //   path: '/about/',
    //   name: 'About',
    //   component: About
    // },
    // {
    //   path: '/add/',
    //   name: 'AddAccount',
    //   component: AddAccount
    // },
    // {
    //   path: '/compose/',
    //   name: 'Compose',
    //   component: Compose
    // },
    {
      path: '/addressbook/',
      name: 'AddressBook',
      component: AddressBook
    }
    // {
    //   path: '/sent/',
    //   name: 'Sent',
    //   component: Sent
    // },
    // {
    //   path: '/drafts/',
    //   name: 'Drafts',
    //   component: Drafts
  ]
})
