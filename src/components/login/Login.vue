<template>
  <div class="login" align="center">
    <img src="./../../assets/logo.png" style="margin:0 auto"/>
    <form class="form">
        <br>
        <div class="Prompt">
          <span id="Status1" class="login_" v-model="access.Status1">{{$store.state.errorinfo}}</span>
        </div>
        <input id="loginUsername" type="text" v-model="item.info.username" placeholder="账    号" title="账号不能为空">
        <input id="loginPassword" type="password" v-model="access.password" placeholder="密    码" title="密码不能小于6位">
        <button class="btn btn-primary btn-block btn-large" v-on:click="login" @keyup.enter="submit">登    录</button>
    </form>
  </div>
</template>

<script>
import MD5 from 'md5'
export default {
  name: 'login',
  data(){
    return{
      item: {
        info:{
          username: null,
          access_token: null
        }
      },
      access:{
        password:null,
        check:false,
        url:"/login"
      }

    }
  },
  methods:{

    login(){
      if(this.loginInspect()){

        console.log("login");
        console.log(this.getCookie("username"));
        if(this.getCookie("username") !=="" && this.getCookie("access_token") !=="" ){
          this.$router.push('../Loading');
        }else {
          this.dataArrangement()
        }
      }

    },
    //准备数据
    dataArrangement(){
      this.item.info.access_token=MD5( this.item.info.username+this.access.password);
      this.sendPost()
    },
    //发送数据
    sendPost(){
      let self = this;
      console.log("sendPost");
      this.$ajax.post(self.$store.state.url+self.access.url, self.item, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        self.analysis(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
    //处理数据
    analysis(dataSource){
        console.log(dataSource.code.MessageCode);
      if(dataSource.code.MessageCode===1001000){
        this.$store.commit("setErrorinfo","");
        this.setCookie("username",dataSource.access.username,2);
        this.setCookie("access_token",dataSource.access.access_token,2);
        this.setCookie("admin",dataSource.access.admin,2);
        this.$router.push('../Loading');

      }else{
        this.$router.push('../login');
        this.$store.commit("setErrorinfo",dataSource.code.MsgInfo);
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
    loginInspect() {
      if(this.item.info.username==="" || this.item.info.username === null){
        this.$store.commit('setErrorinfo',"账号不得为空");
        this.access.check = true;
      }else if(this.access.password===undefined||this.access.password.length<8){
        this.$store.commit('setErrorinfo',"密码至少为8个字符");
        this.access.check = true;
      }else{
        this.access.check = false;
      }
      return !this.access.check;
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
    },
    checkCookie() {
      let user = getCookie("username");
      if (user !== "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user !== null) {
          setCookie("username", user, 7);
        }
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  display: inline-block;
  *display: inline; *zoom: 1;
  padding: 4px 10px 4px;
  margin-bottom: 0;
  font-size: 13px;
  line-height: 18px;
  color: #333333;
  text-align: center;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  vertical-align: middle;
  background-color: #f5f5f5;
  background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: linear-gradient(top, #ffffff, #e6e6e6);
  background-repeat: repeat-x;

  border-color: #e6e6e6 #e6e6e6 #e6e6e6;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  border: 1px solid #e6e6e6;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  *margin-left: .3em; }
.btn:hover, .btn:active, .btn.active, .btn.disabled, .btn[disabled] { background-color: #e6e6e6; }
.btn-large {
  padding: 9px 14px;
  font-size: 15px;
  line-height: normal;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.btn:hover {
  color: #333333;
  text-decoration: none;
  background-color: #e6e6e6;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
  -moz-transition: background-position 0.1s linear;
  -ms-transition: background-position 0.1s linear;
  -o-transition: background-position 0.1s linear;
  transition: background-position 0.1s linear;
}
.btn-primary, .btn-primary:hover { text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); color: #ffffff; }
.btn-primary.active { color: rgba(255, 255, 255, 0.75); }
.btn-primary {
  background-color: #4a77d4;
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  border: 1px solid #3762bc;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5); }
.btn-primary:hover, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled] { filter: none; background-color: #4a77d4; }
.btn-block { width: 100%; display:block; }

* { -webkit-box-sizing:border-box; -moz-box-sizing:border-box; -ms-box-sizing:border-box; -o-box-sizing:border-box; box-sizing:border-box; }

html { width: 100%; height:100%; overflow:hidden; }

.login {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -150px;
}
.login { color: #fff; text-shadow: 0 0 10px rgba(0,0,0,0.3); letter-spacing:1px; text-align:center; }
.form{
    width:300px;
    height:300px;
}

input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 10px;
    background: rgba(0,0,0,0.3);
    border: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 4px;
    box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
    -webkit-transition: box-shadow .5s ease;
    -moz-transition: box-shadow .5s ease;
    -o-transition: box-shadow .5s ease;
    -ms-transition: box-shadow .5s ease;
    transition: box-shadow .5s ease;
}
input:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }

.display{
    width:400px;
    height:300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -250px;
    border-radius:20px 20px;
    background-color: #F8F8FF;
}
.login-button{
    width:100px;
    background-color: #4a77d4;
}
.login_{
    margin-top: 10px;
    font-size: 15px;
    line-height: 30px;
    color: #ffff00;
}
.Prompt{
    background-color: #27408B;
    border-radius: 10px;
}

</style>
