<template>
  <div id="staffManagement">
    <div class="Title"><span id="contentTitle">成员管理</span></div>
    <div id="staffManagementcon">
      <div id="HeadPortrait">
        <img id="HeadPortraitImg"src="../../assets/logo.png"/>
        <div id="HeadPortraitBtn">
          <span>此处添加按钮和说明</span>
        </div>
      </div>
      <div id="staffInfo">
        <!--<span>姓　　名：</span><span id="username">{{info.uName}}</span><br>-->
        <!--<span>性　　别：</span><span id="username">{{info.uGender}}</span><br>-->
        <!--<span>员工编号：</span><span id="username">{{info.uNumber}}</span><br>-->
        <!--<span>部　　门：</span><span id="username">{{info.uDepartment}}</span><br>-->
        <!--<span>办公地点：</span><span id="username">{{info.uPlace}}</span><br>-->
        <!--<span>手机号码：</span><span id="username">{{info.uPhone}}</span><br>-->
        <!--<span>公司邮箱：</span><span id="username">{{info.uMail}}</span><br>-->
      </div>


    </div>
    <div v-if="Popup" class="dev_popup">
      <div class="dev_popup_info">
        <span class="dev_popup_info_span"  >添加成员</span>
        <input type="button" class="dev_popup_info_btn" value="关闭">
        <div class="dev_popup_info_input">
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >姓　　名：</span>
            <input type="text" class="dev_popup_info_input_text" value="" v-model="item.information.addName">
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >性　　别：</span>
            <select  id="select_k1" class=" dev_popup_info_input_select" v-model="item.information.addGender">
              <option value="0" selected>请选择...</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span" >职　　位：</span>
            <select id="select_k2" class=" dev_popup_info_input_select" v-model="item.information.addDepartment">
              <option value="0" selected>请选择...</option>
              <option value="1">业务员</option>
              <option value="2">管理员</option>
            </select>
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >Leader　：</span>
            <select id="select_k3" class=" dev_popup_info_input_select" v-model="item.information.addLeader">
              <option value="0" selected>请选择...</option>
              <option value="无">无</option>
              <option v-for="ll in leaderlist" :value="ll">{{ll}}</option>
            </select>
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >办公地点：</span>
            <select id="select_k4" class=" dev_popup_info_input_select" v-model="item.information.addPlace">
              <option value="0" selected>请选择...</option>
              <option v-for="pl in placelist" :value="pl">{{pl}}</option>
            </select>
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >手机号码：</span>
            <input type="text" class="dev_popup_info_input_text" value="" v-model="item.information.addPhone">
            <span class="dev_popup_info_input_span_"  >*</span>
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >座机号码：</span>
            <input type="text" class="dev_popup_info_input_text" value="" v-model="item.information.addLandline" >
          </div>
          <div class="dev_popup_info_input_">
            <span class="dev_popup_info_input_span"  >公司邮箱：</span>
            <input type="text" class="dev_popup_info_input_text " value="" v-model="item.information.addMail">
          </div>
        </div>
        <div class="dev_popup_info_submit">
          <span class="dev_popup_info_submit_span" >{{msg}}</span>
          <input type="button" class="dev_popup_info_submit_input" value="提 交">
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
          data:{
            username: "哈哈哈",
            access_token: null
          },
          information:{
            addName:"",//用户姓名
            addNumber:null,//用户编号
            addMail:"",//用户邮箱
            addGender:0,//用户xingbie
            addDepartment:0,//用户部门
            addLeader:0,
            addPlace:0,//办公地点
            addPhone:"",
            addLandline:""
          }
        },
        leaderlist:[],
        placelist:[],
        msg:null,
        Popup:true,
        disabledis:false,
        url:"/addMember"
      }

    },
    created(){
       this.getLeader(this.item,this.url);
    },
    methods:{

      getLeader(sendData,url){
        let self = this;
        let json;
        let JSONitem = JSON.stringify(sendData,"UTF-8");
        let xmlHttpRequest = self.createXmlHttpRequest();
        xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+url),true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.onreadystatechange=function(){
          if (xmlHttpRequest.readyState===4 && xmlHttpRequest.status===200){
            json = eval("("+xmlHttpRequest.responseText+")");
            if (json["Code"]===1001000||json["Code"]===1002000){



            }else {
              self.$store.commit('setErrorinfo',json["msg"]);
              self.$router.push('../login')
            }

          }
        };
        xmlHttpRequest.send(encodeURI(JSONitem));
      },

      getAddRequest(sendData,url){

        let self = this;
        let json;

        if(self.check()){
          let JSONitem = JSON.stringify(sendData,"UTF-8");
          let xmlHttpRequest = self.createXmlHttpRequest();
          xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+url),true);
          xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xmlHttpRequest.onreadystatechange=function(){
            if (xmlHttpRequest.readyState===4 && xmlHttpRequest.status===200){
              json = eval("("+xmlHttpRequest.responseText+")");
              if (json["Code"]===1001000||json["Code"]===1002000){

              }else {
                self.$store.commit('setErrorinfo',json["msg"]);
                self.$router.push('../login')
              }

            }
          };
          xmlHttpRequest.send(encodeURI(JSONitem));
        }
      },
      check(){
        if (this.item.information.addName === null
          && this.item.information.addName === undefined
          && this.item.information.addName === ""
          && this.item.information.addName.length===0
        ){
          this.msg = "姓名不能为空！";
          return false;
        }else if(this.item.information.addGender==="0"
          && this.item.information.addGender===0
        ){
          this.msg = "请选择性别！";
          return false;
        }else if(this.item.information.addDepartment==="0"
          && this.item.information.addGender===0){
          this.msg = "请选择正确的职位！";
          return false;
        }else if(this.item.information.addLeader==="0"
          && this.item.information.addLeader===0){
          this.msg = "请选择Leader！";
          return false;
        }else if(this.item.information.addPlace==="0"
          && this.item.information.addPlace===0){
          this.msg = "请选择办公地点！";
          return false;
        }else if(this.item.information.addPhone.replace(/ /, "")===""
          && this.item.information.addPhone.replace(/ /, "").length!==11){
          this.msg = "请输入正确的手机号！";
          return false;
        }else{
          return true;
        }
      },
      createXmlHttpRequest:function(){
        if(window.ActiveXObject){ //如果是IE浏览器
          return new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){ //非IE浏览器
          return new XMLHttpRequest()
        }
      }
    },

    mounted(){

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
  .dev_popup{
    background-color: #cccccc;
    width: 800px;
    height: 480px;
    top: 15%;
    left: 25%;
    border:3px solid #cccccc;
    border-radius: 10px;
    position: absolute;
  }
  .dev_popup_info{
    background-color: #F8F8FF;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border-radius: 6px;
    position: absolute;
  }
  .dev_popup_info_span{
    top: 6px;
    left: 15px;
    font-size: 20px;
    position: absolute;
  }
  .dev_popup_info_btn{
    background-color: #FFFAFA;
    top: 6px;
    right: 15px;
    font-size: 15px;
    border: solid #8492a6;
    border-radius: 6px;
    position: absolute;
  }
  .dev_popup_info_input{
    top: 40px;
    left: 15px;
    right: 15px;
    bottom: 40px;
    border-radius: 6px;
    position: absolute;
  }
  .dev_popup_info_input_{
    margin-top: 18px;
  }
  .dev_popup_info_input_span{
    font-size: 20px;
  }

  .dev_popup_info_input_select{
    width: 300px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #8ee5ee;
  }

  .dev_popup_info_input_text{
    width: 300px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #8ee5ee;
  }

  .dev_popup_info_submit{
    left: 15px;
    right: 15px;
    bottom: 0;
    position: absolute;
  }
  .dev_popup_info_submit_input{
    background-color: #00CD00;
    width: 100px;
    height: 35px;
    right: 40px;
    bottom: 10px;
    font-size: 20px;
    border-radius: 5px;
    border: 3px solid #8492a6;
    position: absolute;
  }
  .dev_popup_info_submit_span{
    color: #D43933;
    left: 45%;
    bottom: 15px;
    margin-right: 30px;
    font-size: 18px;
    position: absolute;
  }
  .dev_popup_info_input_span_{
    color: #d43f3a;
    font-size: 20px;
  }

</style>
