<template>
  <div id="staffManagement">
    <div class="Title"><span class="contentTitle">个人中心</span></div>
    <div class="staffManagementcon">
      <div class="HeadPortrait">
        <img class="HeadPortraitImg"src="../../assets/logo.png"/>
      </div>
      <div class="staffInfo">
          <span class="staffInfo_span">姓　名：</span><span class="span_info">{{services.NAME}}</span><br>
          <span class="staffInfo_span">性　别：</span><span class="span_info">{{services.Gender}}</span><br>
          <span class="staffInfo_span">编　号：</span><span class="span_info">{{services.number}}</span><br>
          <span class="staffInfo_span">部　门：</span><span class="span_info">{{services.department}}</span><br>
          <span class="staffInfo_span">管　理：</span><span class="span_info">{{services.Administration}}</span><br>
          <span class="staffInfo_span">手　机：</span><span class="span_info">{{services.phone}}</span><br>
          <span class="staffInfo_span">邮　箱：</span><span class="span_info">{{services.mailbox}}</span><br>
          <span class="staffInfo_span">地　址：</span><span class="span_info">{{services.address}}</span>
      </div>
      <div class="setInfo">
        <input class="btn btn2" type="button" @click="setChangingPWD_Dis" value="修改秘密" >
        <input class="btn " type="button" @click="setChangingInfoDis"  value="修改资料" >
        <input class="btn btn1" type="button" @click="sendGet('/logout')" value="退出账号" >
      </div>
    </div>
      <div class="alter" v-if="changingInfoDis">
          <div class="changingInfo">
            <br><span>修改信息</span><br><br>
            <div >
              <br>
              手机：<input class="input_" v-model="item.search.手机"/><br>
              邮箱：<input class="input_" v-model="item.search.邮箱" /><br>
              地址：<input class="input_" v-model="item.search.地址" /><br>
              <br>
              <span class="changing_span">
                {{errorInfo}}
              </span>
              <br>
              <br>
              <input class="btn " type="button" @click="setPersonalInformation" value="确定" >
              <input class="btn" type="button" @click="setChangingInfoDis" value="取消" >
            </div>
          </div>
      </div>
      <div class="alter" v-if="changingPWD_Dis">
          <div class="changingInfo" >
            <br><span>修改密码</span><br><br>
            <br>
            原始密码：<input type="password" class="input_ pwd" v-model="assect1"/><br>
            新密码：<input type="password" class="input_ pwd" v-model="pwdassect1" /><br>
            确认密码：<input type="password" class="input_ pwd" v-model="pwdassect2" /><br>
            <br>
            <span class="changing_span">
              {{errorInfo}}
            </span><br>
            <br>
            <input class="btn" type="button" @click="setPWD" value="确定" >
            <input class="btn" type="button" @click="setChangingPWD_Dis" value="取消" >
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
  import MD5 from 'md5'
export default {
  name:"staffManagement",
  data(){
    return{
      item:{
        search:{
          地址:null,
          手机:null,
          邮箱:null
        },

        info:{
          username: null,
          access_token: null
        }

      },
      pwd:{
        search:{
          assect1:null,
          assect2:null
        },
          info:{
              username: null,
              access_token: null
          }

      },
      url:"/getIndividual",
        services:{},
        changingInfoDis:false,
        changingPWD_Dis:false,
      errorInfo:"",
      errorDis:false,
      pwdassect1:"",
      pwdassect2:"",
      assect1:""
    }

  },
  mounted(){
    this.sendGet(this.url)
  },
  methods:{
    setChangingInfoDis(){
      this.changingInfoDis = !this.changingInfoDis;
      this.item.search.地址 = "";
      this.item.search.手机 = "";
      this.item.search.邮箱 = "";
      this.errorInfo = ""
    },
    setChangingPWD_Dis(){
      this.changingPWD_Dis = !this.changingPWD_Dis;
      this.assect1 = "";
      this.pwdassect1 = "";
      this.pwdassect2 = "";
      this.errorInfo = ""
    },
    setParameter(){
        if(this.services.地址==="null"){
          this.services.地址=""
        }
    },
    setPWD(){
      let a = this.assect1.length;
      let b = this.pwdassect1.length;
      let c = this.pwdassect2.length;

      if(a===0||a<8){
        this.errorInfo = "请注意原始密码长度！"
      }else if(b<8){
        this.errorInfo = "新密码个数不得小于8位数！"
      }else if(c<8){
        this.errorInfo = "确认密码个数不得小于8位数！"
      }else if(this.pwdassect1 !== this.pwdassect2){
        this.errorInfo = "两次密码输入不一致！"
      }else if(this.assect1 === this.pwdassect1){
        this.errorInfo = "新密码不能与原始密码相同！"
      }else {
        this.pwd.search.assect1 = MD5( this.getCookie("username")+this.assect1);
        this.pwd.search.assect2 = MD5( this.getCookie("username")+this.pwdassect1);
        this.pwd.info.username = this.getCookie("username");
        this.pwd.info.access_token = this.getCookie("access_token");
        this.sendPost("/setPInformation",this.pwd)
      }
    },
    setPersonalInformation(){
      let a = this.item.search.地址.length;
      let b = this.item.search.手机.length;
      let c = this.item.search.邮箱.length;
      if(b!==11){
        this.errorInfo = "手机号长度不正确！"
      }else if(c<7){
        this.errorInfo = "请检查邮箱地址是否正确！"
      }else if(a===0){
        this.errorInfo = "地址不能为空！"
      }else {
        this.item.info.username = this.getCookie("username");
        this.item.info.access_token = this.getCookie("access_token");
        this.sendPost('/setPersonalInformation',this.item)
      }
    },
    sendPost(url,sendData){
      if(this.getCookie("access_token")){
        let self = this;
        this.$ajax.post(self.$store.state.url+url, sendData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          self.analysis(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      }else {
        this.$router.push('../login');
      }

    },
      sendGet(url){
        if(this.getCookie("access_token")){
          let self = this;
          this.$ajax.get(self.$store.state.url+url+"?username="+this.getCookie("username")+"&access_token="+this.getCookie("access_token"), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            if(response.data.code.MessageCode===1002004){
              self.setCookie("username","",0);
              self.setCookie("access_token","",0);
              self.setCookie("admin","",0);
              self.setCookie("NAME","",0);
              self.$router.push('../login');
            }else if(response.data.code.MessageCode===1001000){
              self.services = response.data.information;
              self.setParameter()
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else {
          this.$router.push('../login');
        }

      },
    analysis(dataSource){
      if(dataSource.code.MessageCode===1002005){
        this.changingInfoDis = false;
        this.sendGet(this.url)
      }else if(dataSource.code.MessageCode===1002007){
        this.$store.commit("setErrorinfo",dataSource.code.MsgInfo);
        this.$router.push('../login');
      }else{
        this.errorInfo = dataSource.code.MsgInfo
      }
    },
    ErrorInfo(msg){
      this.errorInfo = msg;
      this.errorDis = true;
      let self = this;
      setTimeout(self.EI,3000)
    },
    EI(){
      this.errorDis = false
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
#staffManagement{
  top: 5px;
  left: 15px;
  right: 15px;
  bottom: 5px;
  overflow: auto;
  position: absolute;
}
.Title{
  float: left;
  font-family: "STKaiti";
  font-weight: bold;
  color: 	#858585;
  font-size: 35px;
  margin-left: 5px;
  margin-top: 5px;
}
.staffManagementcon {
  /*width: 80%;*/
  height: auto;
  top: 100px;
  left: 7%;
  right: 7%;
  bottom: 0;
  text-align:center;
  position: absolute;
}
.HeadPortrait{
  width: 100%;
  height: 130px;
  text-align:left;
  position: absolute;
}
.HeadPortraitImg{
  float: left;
  border-radius:50%;
  background-color: rgb(25, 145, 236);
  width: 120px;
  height: 120px;
  border-collapse: collapse;
  border:2px solid #778899;
}
.HeadPortraitBtn{
  margin-top: 100px;
  margin-left: 200px;
}
.staffInfo{
  width: 60%;
  height: auto;
  top: 140px;
  text-align:left;
  font-weight: bold;
  font-size: 25px;
  line-height: 40px;
  color: 	#858585;
  position: absolute;
}
.staffInfo_span{
  margin-top: 5px;
  text-align: center;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-family: 楷体;
  color: #000000;
  border-radius: 15px;
  border: 1px solid #000000;
  position: absolute;
  background-color: #EEE9E9;
}
textarea{
  font-size: 18px;
  margin-left: 50px;
}
.setInfo{

  width: 100%;
  margin-top: 475px;
}
.span_info{
  margin-left: 160px;
}
.btn{
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #20a0ff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 15px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
  width: 100px;
  height: 40px;
  margin-right: 20px;
}
  .btn1{
    background-color: #080808;
  }
.btn2{
  background-color: #ec971f;
}
.changingInfo{
    position: absolute;
    background-color: #FFFFFF;
    top: 30%;
    left: 35%;
    width: 500px;
    height: 300px;
    border: 5px solid #737373;
    border-radius: 20px;
}
.changing_span{
  color: #d43f3a;
  font-size: 18px;
  font-weight: 900;
}
.alter{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(98, 96, 104, 0.6);
}
input{
  font-weight: 600;
  font-size: 14px;
  font-family: 楷体;
  border: 2px solid #CDC9C9;
  margin-top: 10px;
  height: 20px;
  border-radius: 5px;
}
.input_{
  width: 350px;
}
.pwd{
  font-size: 20px;
}

</style>
