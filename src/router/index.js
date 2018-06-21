import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import AddAccount from '@/components/AddAccount'
import AddressBook from '@/components/AddressBook'
import Compose from '@/components/Compose'
import Sent from '@/components/Sent'
import Drafts from '@/components/Drafts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about/',
      name: 'About',
      component: About
    },
    {
      path: '/add/',
      name: 'AddAccount',
      component: AddAccount
    },
    {
      path: '/compose/',
      name: 'Compose',
      component: Compose
    },
    {
      path: '/addressbook/',
      name: 'AddressBook',
      component: AddressBook
    },
    {
      path: '/sent/',
      name: 'Sent',
      component: Sent
    },
    {
      path: '/drafts/',
      name: 'Drafts',
      component: Drafts
    }
  ]
})
