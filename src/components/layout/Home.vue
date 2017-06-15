<template>
  <div id="home">
      <HomeHeader></HomeHeader>
      <HomeNavMenu></HomeNavMenu>
      <HomeContent></HomeContent>
      <!-- <Suspended></Suspended>-->
      <!-- <SuspendedInfo></SuspendedInfo> -->
  </div>
</template>

<script>
import HomeHeader from '../subassembly/Header.vue'
import HomeNavMenu from '../subassembly/NavigationMenu.vue'
import HomeContent from '../subassembly/Content.vue'
import Suspended from '../subassembly/Suspended.vue'
// import SuspendedInfo from '../suspendeds/SuspendedInfo.vue'
export default {
  name: 'home',
  components: {
      HomeHeader,
      HomeNavMenu,
      HomeContent,
      Suspended
      // SuspendedInfo
   },
   data(){
     return{
       item: {
         data:{
           username: null,
           access_token: null
         }
       },
       info:{
         url:"/home"
       }
     }
   },
   created(){
     //页面启动后执行
      //  this.sendLogin()
   },
   methods:{
     sendLogin: function(){
       var self = this
       self.username=self.$store.state.username
       self.access_token=self.$store.state.access_token
       var JSONitem = JSON.stringify(self.item)
       function createXmlHttpRequest(){
         if(window.ActiveXObject){ //如果是IE浏览器
           return new ActiveXObject("Microsoft.XMLHTTP");
         }else if(window.XMLHttpRequest){ //非IE浏览器
           return new XMLHttpRequest();
         }
       }

       var xmlHttpRequest = createXmlHttpRequest()
       xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+self.info.url),true)
       xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
       xmlHttpRequest.onreadystatechange=function(){
         if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
           var json = eval("("+xmlHttpRequest.responseText+")")
           if(Boolean(json["status"])==true
             && json["access_token"]!=self.$store.state.access_token
           ){
             self.$store.commit('setStatus',json["status"]);
             self.$store.commit('setAccess_token',json["access_token"])
           }else{
             self.$router.push('./login')
           }
         }else{
           self.$router.push('./login')
         }
         // console.log(self.$store.state.status)
         // console.log(self.$store.state.username)
         // console.log(self.$store.state.access_token)
         xmlHttpRequest= null
       }
       xmlHttpRequest.send(encodeURI(JSONitem))
     }
   }
}
</script>

<style scoped>
#home{
  margin-top: -60px;
}


</style>
