<template>
  <div id="loading" class="loading" >
      <img src="./../../assets/loading.gif">
      <h1>正在登陆...</h1>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data(){
      return{
        items:{
          info:{
            username:"",
            access_token:""
          }
        },
        url:"/loading"
      }
  },
  mounted(){
    this.loading()
  },
  methods:{
    //准备数据
    loading(){
      if(this.getCookie("username")===null && this.getCookie("username")===""){
        this.$router.push('../login')
      }else{
        this.items.info.username = this.getCookie("username");
        this.items.info.access_token = this.getCookie("access_token");
        this.sendPost()
      }
    },
    //发送数据
    sendPost(){
        if(this.getCookie("access_token")){
          let self = this;
          this.$ajax.post(self.$store.state.url+self.url, self.items, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            self.analysis(response.data);
          }).catch(function (error) {
            console.log(error);
          });
        }else {
          this.$store.commit("setErrorinfo","登陆失败，请重试！");
          this.$router.push('../login');
        }

    },
    //处理数据
    analysis(dataSource){
      if(dataSource.code.MessageCode===1001000){
        this.$store.commit("setErrorinfo","");
        this.setCookie("username",dataSource.access.username,7);
        this.setCookie("access_token",dataSource.access.access_token,7);
        this.setCookie("admin",dataSource.access.admin,7);

        this.$router.push('../home/CustomerMA')

      }else{
        this.$store.commit("setErrorinfo",dataSource.code.MsgInfo);
        this.$router.push('../login');
        this.setError();
      }
    },
    setError(){
      if(dataSource.code.MessageCode===1001007){
        this.setCookieNull()
      }
    },
    setCookieNull(){
      this.setCookie("username","",0);
      this.setCookie("access_token","",0);
      this.setCookie("admin","",0);
    },
    setCookie(cname, cvalue, exdays){
      let d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
      }
      return "";
    }

  }
}
</script>

<style scoped>
.loading{
  width: 600px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  margin: -200px 0 0 -300px;
  background-color: rgb(25, 145, 236);
}
</style>
