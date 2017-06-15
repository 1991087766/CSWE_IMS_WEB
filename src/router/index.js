import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Loading from '@/components/login/Loading'
import Home from '@/components/layout/Home'

import Homepage from '@/components/Content/homepage.vue'
import CustomerMsd from '@/components/Content/customerManagementSD.vue'
import CustomerMsz from '@/components/Content/customerManagementSZ.vue'
import CustomerMwx from '@/components/Content/customerManagementWX.vue'
import CustomerMA from '@/components/Content/customerManagementAdmin.vue'
import LoginIP from '@/components/Content/loginIP.vue'
import OperationLog from '@/components/Content/OperationLog.vue'
import StaffManagement from '@/components/Content/staffManagement.vue'
import Setting from '@/components/Content/Setting.vue'
import News from '@/components/Content/news.vue'
import Xlsx from '@/components/Content/xlsx.vue'
import sm from '@/components/Content/SM.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'mypage',
          name: 'mypage',
          component: Homepage
        },
        {
          path: 'CustomerMsd',
          name: 'CustomerMsd',
          component: CustomerMsd
        },
        {
          path: 'CustomerMsz',
          name: 'CustomerMsz',
          component: CustomerMsz
        },
        {
          path: 'CustomerMwx',
          name: 'CustomerMwx',
          component: CustomerMwx
        },
        {
          path: 'CustomerMA',
          name: 'CustomerMA',
          component: CustomerMA
        },
        {
          path: 'LoginIP',
          name: 'LoginIP',
          component: LoginIP
        },
        {
          path: 'OperationLog',
          name: 'OperationLog',
          component: OperationLog
        },
        {
          path: 'StaffManagement',
          name: 'StaffManagement',
          component: StaffManagement
        },
        {
          path: 'Setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: 'News',
          name: 'News',
          component: News
        },
        {
          path: 'Xlsx',
          name: 'Xlsx',
          component: Xlsx
        },
        {
          path: 'sm',
          name: 'sm',
          component: sm
        }
      ]
    }
  ]
})
