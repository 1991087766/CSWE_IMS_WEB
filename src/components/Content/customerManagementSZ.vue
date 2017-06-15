<template>

  <div id="customerManagement">
    <div class="Title"><span class="Title_">客户管理 - 苏州</span></div>
    <div class="Table">
      <table class="table_">
        <tr class="search_tr">
          <td colspan="16"class="input_">

            <input class="input_" type="text" v-model="item.search.CarInfo" placeholder="车牌、手机号、客户名、车架号、发动机号">
            状态:
            <select name="select1" id="select_k1" v-model="item.search.State">
              <option value="0">-全部-</option>
            </select>
            客户类型:
            <select name="select2" id="select_k2" v-model="item.search.Type">
              <option value="0">-全部-</option>
            </select>
            交强险日期:
            <input class="input_2" type="date" v-model="item.search.CompulsoryInsurance.startDate" placeholder="交强险日期">
            <input class="input_2" type="date" v-model="item.search.CompulsoryInsurance.endDate" placeholder="交强险日期">
            客服:
            <select name="select3" id="select_k3" v-model="item.search.CustomerService" >
              <option value="0">-全部-</option>
              <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>
            </select>
          </td>
        </tr>
        <tr class="search_tr">
          <td colspan="16"class="input_">
            登记日期:
            <input class="input_2" type="date" v-model="item.search.RegistrationDate.startDate" placeholder="登记日期">
            <input class="input_2" type="date" v-model="item.search.RegistrationDate.endDate" placeholder="登记日期">
            <input type="checkbox" name="category" @click = "setBinding()"/>
            暂未绑定业务员
            <input type="button" @click="getServerData" value="查 询" >
            <input type="button" value="批量删除" >
            <input type="button" value="变更业务员" >
            <input type="button" value="批量导入" >
            <input type="button" value="新增客户" >
          </td>
        </tr>

      </table>

      <div class="dis_data">
        <table class="table">
          <thead>
          <tr class="tr_title">
            <td style="width: 2%" class="td_title"><label>
              <input type="checkbox" v-model="checkAll" @click="checkedAll()"/>
            </label></td>
            <td style="width: 4%" class="td_CustomerService">客服</td>
            <td style="width: 5%" class="td_LicensePlate">车牌号</td>
            <td style="width: 6%">车架号</td>
            <td style="width: 6%">客户名称</td>
            <td style="width: 6%">品牌</td>
            <td style="width: 7%">车型号</td>
            <td style="width: 7%">发动机号</td>
            <td style="width: 8%" class="td_phone">手机</td>
            <td style="width: 7%">身份证号</td>
            <td style="width: 4%">商业险日期</td>
            <td style="width: 4%">交强险日期</td>
            <td style="width: 4%">登记日期</td>
            <td>地址</td>
            <td style="width: 4%" class="td_status">状态</td>
            <td style="width: 12%" class="td_option">选项</td>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr class="tbody_tr" v-for="row in services">
            <td style="width: 2%"><input type="checkbox" name='checkboxInput'  @click='checkSingle(row["n0"])' value="row['n0']" /></td>
            <td style="width: 4%">{{row["n1"]}}</td>
            <td style="width: 5%">{{row["n2"]}}</td>
            <td style="width: 6%">{{row["n3"]}}</td>
            <td style="width: 6%">{{row["n4"]}}</td>
            <td style="width: 6%">{{row["n5"]}}</td>
            <td style="width: 7%">{{row["n6"]}}</td>
            <td style="width: 7%">{{row["n7"]}}</td>
            <td style="width: 7%">{{row["n8"]}}</td>
            <td style="width: 7%">{{row["n9"]}}</td>
            <td style="width: 4%">{{row["n10"]}}</td>
            <td style="width: 4%">{{row["n11"]}}</td>
            <td style="width: 4%">{{row["n12"]}}</td>
            <td>{{row["n13"]}}</td>
            <td style="width: 4%">{{row["n14"]}}</td>
            <td style="width: 12%"><button >编辑</button><button >删除</button><button >更换业务员</button></td>
          </tr>
          </tbody>

        </table>
      </div>
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
  </div>
</template>

<script type="text/javascript">
export default {
  name:"customerManagement",
  data() {
    return{
      item:{
        search:{
          CarInfo:"",
          State:"",
          Type:"",
          CompulsoryInsurance:{
            startDate:"",
            endDate:""
          },
          RegistrationDate:{
            startDate:"",
            endDate:""
          },
          CustomerService:"0",
          binding:false,
          position:"SZ"
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
      alter:{
        checkboxModel:[],//获取选项框数据
        info:{
          username: null,//账号
          access_token: null
        }
      },
      CustomerService:[],
      services:[],
      checkeds:[],
      tfoot:{
        total: 0,     // 记录总条数
        display: 20,   // 每页显示条数
        current: 1,     // 当前第n页 ， 也可以 watch current 的变化
        pagegroup:10
      },
      url:"/get",
      checkAll: false, //全选
      willShow:true

    }
  },
  mounted:function(){
    this.getServerData(this.item)
  },
  watch: {
    'checkboxModel': {
      handler: function (val, oldVal) {
        if (this.alter.checkboxModel.length === this.services.length) {
          this.checkAll=true;
        }else{
          this.checkAll=false;
        }
      },
      deep: true
    }
  },
  methods:{
    checkSingle:function(value){
      console.log(document.getElementsByName("checkboxInput").checked);

      let list = this.alter.checkboxModel.length;
      if(list===0){
        this.alter.checkboxModel.push(value);
      }else{
        if(this.indexOf(value)>=0){
          this.alter.checkboxModel.splice(this.indexOf(value),1);
        }else{
          this.alter.checkboxModel.push(value);
        }
      }
      console.log(this.alter.checkboxModel);
    },
    indexOf:function (item) {
      for(let i=0;i<this.alter.checkboxModel.length;i++){
        if(this.alter.checkboxModel[i]===item){
          return i;
        }
      }
      return -1;
    },
    checkedAll: function() {
      if (!this.checkAll) {//实现反选
        this.alter.checkboxModel = [];
        for (let i=0;i<this.services.length;i++){
          this.checkeds.push(false)
        }
      }else{//实现全选
        this.alter.checkboxModel = [];
        for (let i=0;i<this.services.length;i++){
          this.alter.checkboxModel.push(this.services[i]["n0"]);
          this.checkeds.push(true)
        }
      }
    },
    getServerData:function(sendData){

      let self = this;
      let json;
      self.item.info.username=self.$store.state.username;
      self.item.info.access_token=self.$store.state.access_token;
      self.item.pages.Request = self.tfoot.current;
      self.item.pages.each_page = self.tfoot.display;
      let JSONitem = JSON.stringify(sendData,"UTF-8");
      let xmlHttpRequest = self.createXmlHttpRequest();
      xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+self.url),true);
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlHttpRequest.onreadystatechange=function(){
        if (xmlHttpRequest.readyState===4 && xmlHttpRequest.status===200){
          json = eval("("+xmlHttpRequest.responseText+")");
          if(self.setlogin(json)){
            self.setStortData(json)
          }else{
            self.$router.push('../login')
          }

        }
      }
      xmlHttpRequest.send(encodeURI(JSONitem));

    },
    setStortData:function(json){
      this.services = json["info"];
      this.tfoot.total = json["pages"]["total"];
      this.CustomerService = json["CustomerService"];
    },
    createXmlHttpRequest:function(){
      if(window.ActiveXObject){ //如果是IE浏览器
        return new ActiveXObject("Microsoft.XMLHTTP");
      }else if(window.XMLHttpRequest){ //非IE浏览器
        return new XMLHttpRequest()
      }
    },
    setCurrent: function(idx) {
      if( this.tfoot.current !== idx && idx > 0 && idx < this.page + 1) {
        this.tfoot.current = idx;
        this.getServerData();
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
      this.getServerData();
    },
    setlogin:function (json) {
      let token = json["access"]["access_token"];
      let user = json["access"]["username"];
//        console.log(user);
//        console.log(token);
      let status = false;
      if(user!==""&&typeof(user)!=="undefined"&&user!==null){
        this.$store.commit('setUsername',user);
        status = true
      }else {
        status = false
      }
      if(token!==""&&token!==null&&typeof(token)!=="undefined"&&status){
        this.$store.commit('setAccess_token',token);
        status = true
      }else {
        status = false
      }
      return status;
    },
    setBinding:function () {
      this.item.search.binding = !this.item.search.binding
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
#customerManagement{
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
  height: 100%;
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
  top: 118px;
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


</style>
