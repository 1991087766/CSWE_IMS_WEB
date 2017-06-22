<template>
  <div id="staffManagement">
    <div class="Title"><span id="contentTitle">系统设置</span></div>
    <div id="staffManagementcon">
      <div id="HeadPortrait">
        <img id="HeadPortraitImg"src="../../assets/logo.png"/>
        <!--<div id="HeadPortraitBtn">-->
          <!--<span>此处添加按钮和说明</span>-->
        <!--</div>-->
      </div>
      <div id="staffInfo">
          <span class="staffInfo_span">姓　名：</span><span class="span_info">{{info.姓名}}</span><br>
          <span class="staffInfo_span">性　别：</span><span class="span_info">{{info.性别}}</span><br>
          <span class="staffInfo_span">编　号：</span><span class="span_info">{{info.编号}}</span><br>
          <span class="staffInfo_span">部　门：</span><span class="span_info">{{info.部门}}</span><br>
          <span class="staffInfo_span">管　理：</span><span class="span_info">{{info.管理}}</span><br>
          <span class="staffInfo_span">手　机：</span><span class="span_info">{{info.手机}}</span><br>
          <span class="staffInfo_span">邮　箱：</span><span class="span_info">{{info.邮箱}}</span><br>
          <span class="staffInfo_span">地　址：</span><span class="span_info">{{info.地址}}</span>
      </div>
      <div id="setInfo">
        <input class="btn btn2" type="button"  value="修改秘密" >
        <input class="btn " type="button"  value="修改资料" >
        <input class="btn btn1" type="button"  value="退出账号" >
      </div>
    </div>
      <div class="changingInfo" v-if="changingInfoDis">
          <br><span>修改信息</span><br><br>
          <div class="changingInfo">
              <br>
              客服：
              <select v-model="alter.CustomerService" >
                  <option value="客服" selected>-全部-</option>
                  <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>
              </select>
              <br><br><br>
              <input class="btn1 delBtn" type="button" @click="sendPostChangeSalesman" value="确定" >
              <input class="btn1" type="button" @click="ChangeSalesman" value="取消" >
          </div>
      </div>
      <div class="changing" v-if="changingPWD_Dis">
          <div class="changingPWD" >
              <br><span>修改密码</span><br><br>
              <div class="changingInfo">
                  <br>
                  客服：
                  <select v-model="alter.CustomerService" >
                      <option value="客服" selected>-全部-</option>
                      <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>
                  </select>
                  <br><br><br>
                  <input class="btn1 delBtn" type="button" @click="sendPostChangeSalesman" value="确定" >
                  <input class="btn1" type="button" @click="ChangeSalesman" value="取消" >
              </div>
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
          assect:null
        },
          info:{
              username: null,
              access_token: null
          }

      },
      info:{
        姓名:null,//用户姓名
        性别:null,//用户编号
        编号:null,//用户邮箱
        部门:null,//用户xingbie
        管理:null,//用户部门
        手机:null,
        邮箱:null,
        地址:null//办公地点
      },
      url:"/getIndividual",
        services:null,
        changingInfoDis:false,
        changingPWD_Dis:false,
      errorInfo:false,
      errorDis:""
    }

  },
  created(){

  },
  methods:{
    setParameter(){
      this.info.姓名=this.services.姓名;
      this.info.性别=this.services.性别;
      this.info.编号=this.services.编号;
      this.info.部门=this.services.部门;
      this.info.管理=this.services.管理;
      this.info.手机=this.services.手机;
      this.info.邮箱=this.services.邮箱;
      this.info.地址=this.services.地址;
    },
    sendPost(url,sendData){
      let self = this;
//      console.log("sendPost");
      this.$ajax.post(self.$store.state.url+url, sendData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        self.analysis(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
      sendGet(url){
          let self = this;
          this.$ajax.get(self.$store.state.url+url, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }).then(function (response) {
        self.analysis(response.data);
          }).catch(function (error) {
              console.log(error);
          });
      },
    analysis(dataSource){
      if(dataSource.code.MessageCode===1001000
        ||dataSource.code.MessageCode===1002005
        ||dataSource.code.MessageCode===1002006
      ){
        if(dataSource.code.MessageCode===1001000){
          this.$store.commit("setErrorinfo","");
          this.services = dataSource.information;
            this.setParameter();
        }
      }else if (dataSource.code.MessageCode===1003002){
        this.addInfo = dataSource.code.MsgInfo
      }else if(dataSource.code.MessageCode===1003001){
        this.ErrorInfo(dataSource.code.MsgInfo)
      }else{
        this.$store.commit("setErrorinfo",dataSource.code.MsgInfo);
        this.$router.push('../login');
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
  height: 130px;
  text-align:left;
  position: absolute;
}
#HeadPortraitImg{
  float: left;
  border-radius:50%;
  background-color: rgb(25, 145, 236);
  width: 120px;
  height: 120px;
  border-collapse: collapse;
  border:2px solid #778899;
}
#HeadPortraitBtn{
  margin-top: 100px;
  margin-left: 200px;
}
#staffInfo{
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
#setInfo{

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
    background-color: #d9edf7;
    top: 30%;
    left: 35%;
    width: 400px;
    height: 200px;
    border: 5px solid #737373;
    border-radius: 20px;
}
.alter{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(98, 96, 104, 0.6);
}
.changingInfo{
    position: absolute;
    background-color: #d9edf7;
    top: 30%;
    left: 35%;
    width: 400px;
    height: 200px;
    border: 5px solid #737373;
    border-radius: 20px;
}

</style>
