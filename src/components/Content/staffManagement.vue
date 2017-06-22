<template>

  <div id="StaffManagement">
    <div class="Title"><span class="Title_">部门管理</span></div>
    <div class="Table">
      <table class="table_">
        <tr class="search_tr">
          <td colspan="8">
            <input class="input_" type="text" v-model="items.search.SearchInfo" placeholder="姓 名、部 门、管 理">
            在职状态:
            <select class="select1" name="select1" id="select_k1" v-model="items.search.SearchState">
              <option value="*" selected>-全部-</option>
              <option value="在职">在职</option>
              <option value="已离职">已离职</option>
            </select>
            <button class="btn1"  @click="setData(url,items)" >搜 索</button>
            <button class="btn1"  @click="addDis" >添 加 账 户</button>
          </td>
        </tr>

      </table>

      <div class="dis_data">
        <table class="table">
          <thead>
          <tr class="tr_title">
            <td style="width: 7%">标记</td>
            <td style="width: 5%">姓名</td>
            <td style="width: 7%">账号</td>
            <td style="width: 7%">手机</td>
            <td style="width: 9%">邮件</td>
            <td style="width: 5%">部门</td>
            <td style="width: 5%">管理</td>
            <td style="width: 5%">状态</td>
            <td style="width: 7%">入职日期</td>
            <td style="width: 7%">离职日期</td>
            <td>地址</td>
            <td style="width: 8%" class="td_option">选项</td>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr class="tbody_tr" v-for="row in services">
            <td>{{row["编号"]}}</td>
            <td>{{row["姓名"]}}</td>
            <td>{{row["账号"]}}</td>
            <td>{{row["手机"]}}</td>
            <td>{{row["邮件"]}}</td>
            <td>{{row["部门"]}}</td>
            <td>{{row["管理"]}}</td>
            <td>{{row["状态"]}}</td>
            <td>{{getDates(row["入职时间"])}}</td>
            <td>{{row["离职时间"]}}</td>
            <td >{{row["地址"]}}</td>
            <td><button class="btn1 btn" @click="qSettings(row['编号'])">设置</button></td>
          </tr>
          </tbody>

        </table>
      </div>

      //分页
      <div class="tf">
        <div class="page-bar">
          <ul class="pagination">
            <li :class="{'disabled': tfoot.current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
            <li :class="{'disabled': tfoot.current == 1}"><a href="javascript:;" @click="setCurrent(tfoot.current - 1)"> 上一页 </a></li>
            <li v-for="p in grouplist" :class="{'active': tfoot.current == p.val}"><a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a></li>
            <li :class="{'disabled': tfoot.current == page}"><a href="javascript:;" @click="setCurrent(tfoot.current + 1)"> 下一页</a></li>
            <li :class="{'disabled': tfoot.current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
          </ul>
          <ul class=" pull-right">
            <li><span> 共 {{ tfoot.total }}  条数据 </span></li>
            <li><span> 共 {{ page }} 页 </span></li>
            <li><span> 当前第 {{ tfoot.current }} 页 </span></li>
          </ul>
          <ul class="pagination-right">
            <li><a href="javascript:;" @click="setDisData()"> 每页显示 {{ tfoot.display }}  条数据 </a></li>
          </ul>
        </div>
      </div>
    </div>



    <div class="changingDiv" v-if="errorDis">
      <br><br><br><br>
      <div class="changingInfo">
        <span>{{errorInfo}}</span>
      </div>
    </div>

    <div class="alter" v-if="addInfo">
      <div class="addCustomer">
        <span class="alterCustomer_title ">新增账户</span>
        <div class="AddCustomer_info">
          <div class="Add_div">
            账号：<input class="Add_input" type="text" v-model="AddInfo.search.Username" placeholder="邮箱 或 姓名拼音">
            姓名：<input class="Add_input" type="text" v-model="AddInfo.search.Name" placeholder="中文、英文均可">
          </div>
          <div class="Add_div">
            性别：<select class="select_alter" name="select1"  v-model="AddInfo.search.Gender" >
            <option value="男" selected> 男 </option>
            <option value="女">女</option>
          </select>
          </div>
          <div class="Add_div">
            部门:
            <select class="select_alter " name="select1" v-model="AddInfo.search.Department" >
              <option value="业务部" selected>业务部</option>
              <option value="后勤部">后勤部</option>
            </select>
            管理:
            <select class="select_alter" name="select1" v-model="AddInfo.search.Leader" >
              <option value="*" selected>-全部-</option>
              <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>
            </select>
          </div>
          <div class="Add_div">
            管理员:
            <select class="select_alter select_alter_add" name="select1" v-model="AddInfo.search.admin" >
              <option value="1" selected>否</option>
              <option value="2">是</option>
            </select>
          </div>
          <div class="Add_div">
            手机：<input class="Add_input" type="text" placeholder="11位手机号码"  v-model="AddInfo.search.Phone" >
            邮箱：<input class="Add_input" type="text" placeholder="常用邮箱"  v-model="AddInfo.search.Mail" >
          </div>
          <div class="Add_div">
            地址：<input class="Add_input Add_input_Address" type="text" placeholder="现居住地址" v-model="AddInfo.search.Address" >
          </div>
        </div>
        <span>{{adderror}}</span><br>
        <input class="btn1 delBtn btn_position" type="button" @click="addPost" value="确定" >
        <input class="btn1 btn_position" type="button" @click="addDis()" value="取消" >
      </div>
    </div>



    <div class="alter" v-if="willShow">
      <div class="alterCustomer">
        <span class="alterCustomer_title ">修改信息</span>
        <div class="alterCustomer_info">
          <div class="div_select">
            部门：
            <select class="select_alter" name="select1" v-model="setting.search.setDepartment">
              <option value="*" selected>-全部-</option>
              <option value="业务部">业务部</option>
              <option value="后勤部">后勤部</option>
            </select>
          </div>

          <div class="div_select">
            管理：
            <select class="select_alter" name="select1" v-model="setting.search.setAdministration">
              <option value="*" selected>-全部-</option>
              <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>

            </select>
          </div>
        </div>
        <span>{{settingerror}}</span><br>
        <input class="btn1 delBtn btn_position" type="button" @click="settingPost" value="确定" >
        <input class="btn1 btn_position" type="button" @click="qSettings('')" value="取消" >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: "StaffManagement",
    data() {
      return{
        items:{
          search:{
            SearchInfo:null,
            SearchState:"*"
          },
          info:{
            username: null,
            access_token: null
          },
          pages:{
            Request:1,
            each_page:0
          }
        },
        AddInfo:{
          search:{
            Username:null,
            Name:null,
            Gender:"男",
            Department:"业务部",
            Address:null,
            Phone:null,
            Mail:null,
            admin:1,
            Leader:"*"
          },
          info:{
            username: null,
            access_token: null
          }
        },
        setting:{
          search:{
            SearchNumber:"",
            setDepartment:"*",
            setAdministration:"*"
          },
          info:{
            username: null,
            access_token: null
          }
        },
        settingerror:"",
        CustomerService:[],
        services:[],
        tfoot:{
          total: 0,     // 记录总条数
          display: 20,   // 每页显示条数
          current: 1,     // 当前第n页 ， 也可以 watch current 的变化
          pagegroup:10
        },
        url:"/getDepartment",
        willShow:false,
        addInfo:false,
        adderror:"",
        errorInfo:false,
        errorDis:""
      }
    },
    mounted:function(){
      this.items.info.username = this.getCookie("username");
      this.items.info.access_token = this.getCookie("access_token");
      this.sendGet("/getAdminList?username="+this.items.info.username+"&access_token="+this.items.info.access_token);
      this.setData(this.url,this.items)
    },
    methods:{
      addDis(){
        this.addInfo = !this.addInfo;
      },

      addPost(){
          if(this.AddInfo.search.Username===null){
            this.adderror = "账号必须大于2个字符！"
          }else if(this.AddInfo.search.Name===null){
            this.adderror = "姓名过短！"
          }else if(this.AddInfo.search.Leader==="*"){
            this.adderror = "请选择该员工正确的管理！"
          }else if(this.AddInfo.search.Phone===null){
            this.adderror = "请填写正确的手机号！"
          }else{
            this.AddInfo.info.username =  this.getCookie("username");
            this.AddInfo.info.access_token = this.getCookie("access_token");
            this.sendPost("/addAccount",this.AddInfo)
          }
      },

      qSettings(value){
        this.setting.search.SearchNumber=value;
        this.settingerror="";
        this.willShow = !this.willShow
      },
      settingPost(){
        if(this.setting.search.setDepartment.length>1||this.setting.search.setDepartment.length>1){
          this.setting.info.username =  this.getCookie("username");
          this.setting.info.access_token = this.getCookie("access_token");
          this.settingerror="";
          this.willShow = !this.willShow;
          this.setData("/setDepartment",this.setting)
        }else {
          this.settingerror="请选择要修改的内容后再提交！"
        }
      },
      //数据准备
      setData(url,sendData){
        if(this.getCookie("username")===null && this.getCookie("username")===""){
          this.$router.push('../login')
        }else{
          this.items.pages.Request = this.tfoot.current;
          this.items.pages.each_page = this.tfoot.display;

          this.sendPost(url,sendData)
        }
      },
      //发送数据
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
            this.$ajax.get(self.$store.state.url+url, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              self.CustomerService=response.data.information
            }).catch(function (error) {
              console.log(error);
            });
          }else {
            this.$router.push('../login');
          }
      },
      //处理数据
      analysis(dataSource){
        if(dataSource.code.MessageCode===1001000
          ||dataSource.code.MessageCode===1002005
          ||dataSource.code.MessageCode===1002006
        ){
          if(dataSource.code.MessageCode===1001000){
            this.$store.commit("setErrorinfo","");
            this.services = dataSource.information;
            this.CS = [];
            this.tfoot.total = dataSource.pages.total;
          }else {
            this.addInfo=false;
            this.setData(this.url,this.items)
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
      getDates(value){
        if(value!=="—"){
          let newDate = new Date();
          newDate.setTime(value);
          let ndm ;
          if(newDate.getMonth()+1<10){
            ndm= '-0'+(newDate.getMonth()+1)
          }else {
            ndm= '-'+(newDate.getMonth()+1)
          }
          let ndd ;
          if(newDate.getDate()<10){
            ndd= '-0'+newDate.getDate()
          }else {
            ndd= '-'+newDate.getDate()
          }
          return newDate.getFullYear()+ndm+ndd;
        }else {
            return "—"
        }
      },
      getTimeStamp(value){
        return new Date(value+" 12:0:0").getTime()/1000
      },
      setCurrent: function(idx) {
        if( this.tfoot.current !== idx && idx > 0 && idx < this.page + 1) {
          this.tfoot.current = idx;
          this.setData(this.url,this.items)
        }
      },
      setDisData:function(){
        if(this.tfoot.display===20){
          this.tfoot.display=50
        }else if(this.tfoot.display===50){
          this.tfoot.display=100
        }else if(this.tfoot.display===100){
          this.tfoot.display=20
        }
        this.tfoot.current = 1;
        this.setData(this.url,this.items)
      }
    },
    computed:{

      page:function() { // 总页数
        if(this.tfoot.total===0){
          return 1
        }else{
          return Math.ceil(this.tfoot.total / this.tfoot.display)
        }
      },
      grouplist:function(){ // 获取分页页码
        let len = this.page , temp = [], list = [], count = Math.floor(this.tfoot.pagegroup / 2) ,center = this.tfoot.current;
        if( len <= this.tfoot.pagegroup ){
          while(len--){ temp.push({text:this.page-len,val:this.page-len});}
          return temp;
        }
        while(len--){ temp.push(this.page - len);};
        let idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.tfoot.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count -1, this.tfoot.pagegroup);
        do {
          let t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        }while(temp.length);
        if( this.page > this.tfoot.pagegroup ){
          (this.tfoot.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
          (this.tfoot.current < this.page - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
        }
        return list;
      }
    }

  }
</script>

<style scoped>
  #StaffManagement{
    top: 5px;
    left: 15px;
    right: 15px;
    bottom: 5px;
    float: left;
    position: absolute;
  }
  .Title{
    width: 100%;
    margin-right: -20px;
    display: inline-block;
    font-family: "STKaiti";
    font-weight: bold;
    font-size: 35px;
    color: 	#858585;
  }
  .Title_{
    float: left;
  }
  /*边框设置*/
  .table_ {
    border-top:2px solid #778899;
    border-left:2px solid #778899;
    border-right:2px solid #778899;
    border-bottom:2px solid #778899;
  }
  td{border-left:1px solid #778899;border-top:2px solid #778899}
  table {
    width: 100%;
    height: inherit;
    border-collapse:collapse;
  }

  .table{
    width: 100%;
    height: auto;
    border-collapse:collapse;

  }

  tbody{
    width: 100%;
    height: 200px;
    font-size: 13px;
    border-right:2px solid #778899;
  }

  .dis_data{
    width: 100%;
    height: auto;
    top: 85px;
    bottom: 48px;
    position: absolute;
    overflow-y: auto;

    border-top:1px solid #778899;
    border-left:1px solid #778899;
    border-right:2px solid #778899;
    border-bottom:1px solid #778899;
  }

  .tf{
    width: 100%;
    position: absolute;
    bottom: 10px;
    border:2px solid #778899;
  }

  thead{
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    text-align:center;

  }
  td{
    word-break: break-all;
    height: 30px;
    border:2px solid #778899;
  }
  .tr_title{
    background-color: #8EE5EE;
    /*right: 10px;*/
  }
  .search_tr{
    background-color: #00E5EE;
  }
  .input_{
    width: 260px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }
.select1{
  font-size: 15px;
  font-family: 楷体;
  border: 2px solid #CDC9C9;
  border-radius: 5px;
}
  .tbody_tr{
    font-size: 10px;
  }

  ul,li{
    margin: 0px;
    padding: 0px;
  }
  li{
    float:left;display:inline;
    list-style: none;
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
  .pull-right{
    border: 1px solid #ddd;
    text-decoration: none;
    float: right;
    position: relative;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
  }
  .pagination-right{
    margin-right: 10px;
    float: right;
  }

  span{
    margin-right: 10px;
  }
  .input_2{
    width: 120px;
    height: 18px;
  }

  .btn1{
    /*display: inline-block;*/
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
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
    width: 100px;
  }
  .delInfo{
    position: absolute;
    background-color: #d9edf7;
    top: 30%;
    left: 35%;
    width: 400px;
    height: 160px;
    border: 5px solid #737373;
    border-radius: 20px;
  }
  .delBtn{
    background-color: #d9534f;
  }

  .changingDiv{
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
  .alterCustomer{
    width: 500px;
    height: 260px;
    border: 2px solid #00BFFF;
    border-radius: 20px;
    margin-left: 35%;
    margin-top: 10%;
    background-color: #F8F8FF;

  }
  .alterCustomer_title{
    display: block;
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    font-family: "楷体";
  }
  .alterCustomer_info{
    width: 100%;
    height: 90px;
    margin-top: 50px;
    font-size: 25px;
    font-family: "楷体";
    font-weight: 900;
    /*background-color: #d9534f;*/
  }
  .btn_position{
    margin-top: 10px;
  }
  .div_select{
    margin-top: 10px;
  }
  .select_alter{
    width: 190px;
    font-size: 18px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
    /*height: 20px;*/
  }
  .select_alter_add{
    width: 170px;
  }
  .btn{
    background-color: #d43f3a;
  }

  .addCustomer{
    width: 600px;
    height: 460px;
    border: 2px solid #00BFFF;
    border-radius: 20px;
    margin-left: 33%;
    margin-top: 10%;
    background-color: #F8F8FF;

  }

  .AddCustomer_info{
    width: 100%;
    height: 290px;
    margin-top: 20px;
    font-size: 20px;
    font-family: "楷体";
    font-weight: 900;
    /*background-color: #d9534f;*/
  }
  .Add_div{
    margin-top: 15px;
    float: left;
    margin-left: 40px;
  }
  .Add_input{
    border: 2px solid #8492a6;
    border-radius: 5px;
    width: 185px;
    height: 25px;
    font-size: 15px;
  }
  .Add_input_Address{
    width: 445px;
  }
</style>
