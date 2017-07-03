// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Layout from './components/layout/Layout'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import vueXlsxTable from 'vue-xlsx-table'
import axios from 'axios'

Vue.prototype.$ajax = axios
Vue.use(vueXlsxTable)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.interceptors.push(function(request, next) {

  // modify method
  request.method = 'POST';

  // modify headers
  request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  request.headers.set('Authorization', 'Bearer TOKEN');

  // continue to next interceptor
  next();
});



const store = new Vuex.Store({
  state: {
      status: false,//状态
      username: null,//账号
      access_token: null,//access_token
      admin: false,//是否管理员
      reason: 0,//错误状态值
      url:"http://118.178.142.88:8093",
      news:0,
      ip:null,
      address:null,

      //用户信息
      uImgurl: null,//用户头像url
      uName:null,//用户姓名
      uNumber:null,//用户编号
      uMail:null,//用户邮箱
      uGender:null,//用户性别
      uDepartment:null,//用户部门
      uPlace:null,//办公地点
      uPhone:null,//办公地点

      //分页相关
      total:0,
      current:0,
      displaypage:20,
      request_page:1,

      //错误信息
      errorinfo:null,

      //菜单地址
      position:null
  },
  mutations: {

    setIp(state,value){
      state.ip=value
    },
    setAddress(state,value){
      state.address=value
    },

    setErrorinfo(state,value){
      state.errorinfo=value
    },

    setStatus(state,status){
      state.status=status
    },
    setUsername (state,name) {
      state.username=name
    },
    setAccess_token (state,token) {
      state.access_token=token
    },
    setAdmin (state,admin) {
      state.admin=admin
    },
    setReason (state,reason) {
      state.reason=reason
    },
    setNews (state,news) {
      state.news=news
    },

    //用户信息
    setUImgurl (state,uImgurl) {
      state.uImgurl=uImgurl
    },
    setUName (state,uName) {
      state.uName=uName
    },
    setUMail (state,uMail) {
      state.uMail=uMail
    },
    setUGender (state,uGender) {
      state.uGender=uGender
    },
    setUDepartment (state,uDepartment) {
      state.uDepartment=uDepartment
    },
    setUNumber(state,uNumber) {
      state.uNumber=uNumber
    },
    setUPlace (state,uPlace) {
      state.uPlace=uPlace
    },
    setUPhone (state,uPhone) {
      state.uPhone=uPhone
    },

    //分页相关
    setDisplayPage (state,value) {
      state.displaypage=value
    },
    setCurrent (state,value) {
      state.current=value
    },
    setTotal (state,value) {
      state.total=value
    },
    setRequest_page(state,value){
      state.request_page=value
    },
    //菜单地址
    setPosition(state,value){
      state.position=value
    }

  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
