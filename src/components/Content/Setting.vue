<template>
  <div id="staffManagement">
    <div class="Title"><span id="contentTitle">系统设置</span></div>
    <div id="staffManagementcon">
      <div id="HeadPortrait">
        <img id="HeadPortraitImg"src="../../assets/logo.png"/>
        <div id="HeadPortraitBtn">
          <span>此处添加按钮和说明</span>
        </div>
      </div>
      <div id="staffInfo">
          <span>姓　　名：</span><span id="username">{{info.uName}}</span><br>
          <span>性　　别：</span><span id="username">{{info.uGender}}</span><br>
          <span>员工编号：</span><span id="username">{{info.uNumber}}</span><br>
          <span>部　　门：</span><span id="username">{{info.uDepartment}}</span><br>
          <span>办公地点：</span><span id="username">{{info.uPlace}}</span><br>
          <span>手机号码：</span><span id="username">{{info.uPhone}}</span><br>
          <span>公司邮箱：</span><span id="username">{{info.uMail}}</span><br>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"staffManagement",
  data(){
    return{
      item:{
        data:{
          username: null,
          access_token: null
        }
      },
      info:{
        uImgurl: null,//用户头像url
        uName:null,//用户姓名
        uNumber:null,//用户编号
        uMail:null,//用户邮箱
        uGender:null,//用户xingbie
        uDepartment:null,//用户部门
        uPlace:null,//办公地点
      },
      url:"/setting"
    }

  },
  created(){
    // this.sendLogin();
  },
  methods:{
    setParameter:function(){
      this.info.uImgurl=this.$store.state.uImgurl
      this.info.uName=this.$store.state.uName
      this.info.uNumber=this.$store.state.uNumber
      this.info.uMail=this.$store.state.uMail
      this.info.uGender=this.$store.state.uGender
      this.info.uDepartment=this.$store.state.uDepartment
      this.info.uPlace=this.$store.state.uPlace
      this.info.uPhone=this.$store.state.uPhone
    },
    sendLogin: function(){
      var self = this
      var JSONitem = JSON.stringify(self.item)
      var xmlHttpRequest =self.createXmlHttpRequest()
      xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+self.url),true)
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xmlHttpRequest.onreadystatechange=function(){
        if (xmlHttpRequest.readyState===4 && xmlHttpRequest.status===200){
          var json = eval("("+xmlHttpRequest.responseText+")")
          if(Boolean(json["status"])===true
            && json["username"]!==self.$store.state.username
            && json["access_token"]!==self.$store.state.access_token
          ){
            self.$store.commit('setStatus',json["status"])
            self.$store.commit('setUsername',json["username"])
            self.$store.commit('setAccess_token',json["access_token"])
            self.$store.commit('setAdmin',json["admin"])
            self.$store.commit('setReason',json["reason"])

            self.$store.commit('setUImgurl',json["uImgurl"])
            self.$store.commit('setUName',json["uName"])
            self.$store.commit('setUNumber',json["uNumber"])
            self.$store.commit('setUMail',json["uMail"])
            self.$store.commit('setUGender',json["uGender"])
            self.$store.commit('setUDepartment',json["uDepartment"])
            self.$store.commit('setUPlace',json["uPlace"])
            self.$store.commit('setUPhone',json["uPhone"])
            self.setParameter()
          }else{
            self.$router.push('../login')
          }
        }else{
          self.$router.push('../login')
        }
      }
      xmlHttpRequest.send(encodeURI(JSONitem))
    },
    signout: function(){
      var self = this
      self.username=self.$store.state.username
      self.access_token=self.$store.state.access_token
      var JSONitem = JSON.stringify(self.item)
      var xmlHttpRequest = self.createXmlHttpRequest()
      xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+self.url),true)
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xmlHttpRequest.onreadystatechange=function(){
        if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
          self.$router.push('../login')
        }
      }
      xmlHttpRequest.send(encodeURI(JSONitem))
    },
    createXmlHttpRequest:function(){
        if(window.ActiveXObject){ //如果是IE浏览器
          return new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){ //非IE浏览器
          return new XMLHttpRequest()
      }
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
#staffManagementcon {
  /*width: 80%;*/
  height: auto;
  top: 100px;
  left: 7%;
  right: 7%;
  bottom: 0;
  text-align:center;
  position: absolute;
}
#HeadPortrait{
  width: 100%;
  height: 200px;
  text-align:left;
  position: absolute;
}
#HeadPortraitImg{
  float: left;
  border-radius:50%;
  background-color: rgb(25, 145, 236);
  width: 150px;
  height: 150px;
  border-collapse: collapse;
  border:2px solid #778899;
}
#HeadPortraitBtn{
  margin-top: 100px;
  margin-left: 200px;
}
#staffInfo{
  width: 100%;
  height: auto;
  top: 200px;
  text-align:left;
  font-family: "STKaiti";
  font-weight: bold;
  font-size: 25px;
  line-height: 40px;
  color: 	#858585;
  position: absolute;
}
textarea{
  font-size: 18px;
  margin-left: 50px;
}
thead{
  top: 0;
  left: 0;
  right: 0;
  bottom: 40;
  text-align:center;
  background-color: #4EEE94;
}
td{
  word-break: break-all;
  min-width: auto;
  height: 30px;
  border:2px solid #778899;
}
tbody{

}
tfoot{
  /*position: fixed;
  bottom: 20px;*/
}
.tfoot_td{
  height: 40px;
}

</style>
