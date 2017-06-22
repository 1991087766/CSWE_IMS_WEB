<template>

  <div id="WODE" >
    <div class="Title"><span class="Title_">客户管理 - 我的客户清单</span></div>
    <div class="Table">
      <table class="table_">
        <tr class="search_tr">
          <td colspan="16" class="input_">

            <input class="input_" type="text" v-model="items.search.CarInfo" placeholder="车牌、手机号、客户名、车架号、发动机号">
            状态:
            <select name="select1" id="select_k1" v-model="items.search.State" >
              <option  value="ALL" selected>-全部-</option>
              <option value="未处理">未处理</option>
              <option value="预约">预约</option>
              <option value="成功">成功</option>
              <option value="失败">失败</option>
              <option value="需修改">需修改</option>
            </select>
            客户类型:
            <select name="select2" id="select_k2" v-model="items.search.Type">
              <option value="ALL" selected>-全部-</option>
            </select>
            交强险日期:
            <input class="input_2" type="date" v-model="CompulsoryInsurance.startDate" placeholder="交强险日期">
            <input class="input_2" type="date" v-model="CompulsoryInsurance.endDate" placeholder="交强险日期">
          </td>
        </tr>
        <tr class="search_tr">
          <td colspan="16" class="input_">
            登记日期:
            <input class="input_2" type="date" v-model="RegistrationDate.startDate" placeholder="登记日期">
            <input class="input_2" type="date" v-model="RegistrationDate.endDate" placeholder="登记日期">
            <input class="btn1" type="button" @click="setData(url,items)" value="查 询" >
            <input class="btn1" type="button" @click="ChangeSalesman" value="变更业务员" >
            <!--<input class="btn1" type="button" value="新增客户" >-->


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
            <td style="width: 3%" class="td_CustomerService">客服</td>
            <td style="width: 4%" class="td_LicensePlate">车牌号</td>
            <td style="width: 6%">车架号</td>
            <td style="width: 7%">客户名称</td>
            <td style="width: 6%">品牌</td>
            <td style="width: 6%">车型号</td>
            <td style="width: 7%">发动机号</td>
            <td style="width: 5%" class="td_phone">手机</td>
            <td style="width: 8%">身份证号</td>
            <td style="width: 5%">商业险日期</td>
            <td style="width: 5%">交强险日期</td>
            <td style="width: 5%">登记日期</td>
            <td>地址</td>
            <td style="width: 4%" class="td_status">状态</td>
            <td style="width: 12%" class="td_option">选项</td>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr class="tbody_tr" v-for="row in services">
            <td style="width: 2%"><input type="checkbox"  id="row['编号']" @click='checkSingle(row["编号"])'  /></td>
            <td style="width: 3%">{{CS[row["No."]-1]}}</td>
            <td style="width: 4%">{{row["车牌号"]}}</td>
            <td style="width: 6%">{{row["车架号"]}}</td>
            <td style="width: 7%">{{row["客户名称"]}}</td>
            <td style="width: 5%">{{row["品牌"]}}</td>
            <td style="width: 6%">{{row["车型号"]}}</td>
            <td style="width: 7%">{{row["发动机号"]}}</td>
            <td style="width: 5%">{{row["手机"]}}</td>
            <td style="width: 8%">{{row["身份证号"]}}</td>
            <!--<td style="width: 4%" v-on:click="getDatas(row['COMMERCIAL'])"></td>-->
            <td style="width: 4%">{{services_time1[row["No."]-1]}}</td>
            <td style="width: 4%">{{services_time2[row["No."]-1]}}</td>
            <td style="width: 4%">{{services_time3[row["No."]-1]}}</td>
            <td>{{row["地址"]}}</td>
            <td style="width: 4%">{{ZT[row["No."]-1]}}</td>
            <td style="width: 12%">
              <button @click="setAfterCustomer(row)">编辑</button>
              <button v-if="!delInfo.del&&!delInfo.dellist" @click="delInfoData(row['编号'])">删除</button>
              <button @click="ChangeSalesman2(row['编号'])">更换业务员</button>
            </td>
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

    <div class="delInfo" v-if="delInfo.del">
      <div class="btnDiv">
        <br><br><span>确认删除这条信息？</span><br><br><br>
        <input class="btn1 delBtn" type="button" @click="delData" value="删除" >
        <input class="btn1" type="button" @click="delInfodel" value="取消" >
      </div>
    </div>
    <div class="delInfo" v-if="delInfo.dellist">
      <div class="btnDiv">
        <br><br><span>确认删除这些信息？</span><br><br><br>
        <input class="btn1 delBtn" type="button" @click="delDataList" value="删除" >
        <input class="btn1" type="button" @click="delInfodel" value="取消" >
      </div>
    </div>
    <div class="changingDiv" v-if="CustomerServiceDis">
      <br><span>业务员变更</span><br><br>
      <div class="changingInfo">
        <br>
        客服：
        <select name="select_changing2" id="select_changing2" v-model="alter.CustomerService" >
          <option value="客服" selected>-全部-</option>
          <option v-for="cs in CustomerService" :value="cs">{{cs}}</option>
        </select>
        <br><br><br>
        <input class="btn1 delBtn" type="button" @click="sendPostChangeSalesman" value="确定" >
        <input class="btn1" type="button" @click="ChangeSalesman" value="取消" >
      </div>
    </div>
    <div class="changingDiv" v-if="errorDis">
      <br><br><br><br>
      <div class="changingInfo">
        <span>{{errorInfo}}</span>
      </div>
    </div>
    <div class="alter" v-if="AfterCustomerDis">
      <div class="alterCustomer">
        <span class="alterCustomer_title ">修改客户信息</span>
        <div class="alterCustomer_info">
          <table class="alter_table" >
            <tbody>
            <tr class="alter_tr">
              <td style="width: 12%"><span class="alter_text">客户名</span></td>
              <td style="width: 17%"><span class="alter_text">{{afterCustomer.search.客户名称}}</span></td>
              <td style="width: 12%"><span class="alter_text">车牌号</span></td>
              <td style="width: 17%"><span class="alter_text">{{afterCustomer.search.车牌号}}</span></td>
              <td style="width: 12%"><span class="alter_text">车架号</span></td>
              <td ><span class="alter_text">{{afterCustomer.search.车架号}}</span></td>
            </tr>
            <tr class="alter_tr">
              <td><span class="alter_text">品牌</span></td>
              <td ><input class="alter_input" type="text" v-model="afterCustomer.search.品牌"/></td>
              <td><span class="alter_text">车型号</span></td>
              <td ><span class="alter_text">{{afterCustomer.search.车型号}}</span></td>
              <td><span class="alter_text">发动机号</span></td>
              <td ><span class="alter_text">{{afterCustomer.search.发动机号}}</span></td>
            </tr>
            <tr class="alter_tr">
              <td><span class="alter_text">固定电话</span></td>
              <td ><input class="alter_input" type="text" v-model="afterCustomer.search.固定电话"/></td>
              <td><span class="alter_text">手机号码</span></td>
              <td ><input class="alter_input" type="text" v-model="afterCustomer.search.手机号码"/></td>
              <td><span class="alter_text">身份证号</span></td>
              <td ><input class="alter_input" type="text" v-model="afterCustomer.search.身份证号"/></td>
            </tr>
            <tr class="alter_tr">
              <td><span class="alter_text">登记日期</span></td>
              <td ><input class="alter_input_date" type="date" v-model="afterCustomer.search.登记日期"/></td>
              <td><span class="alter_text">交强险日期</span></td>
              <td ><input class="alter_input_date" type="date" v-model="afterCustomer.search.交强险日期"/></td>
              <td><span class="alter_text">商业险日期</span></td>
              <td ><input class="alter_input_date" type="date" v-model="afterCustomer.search.商业险日期"/></td>
            </tr>
            <tr class="alter_tr">
              <td><span class="alter_text">投保公司</span></td>
              <td ><select class="alter_select" v-model="afterCustomer.search.投保公司">
                <option value="无" selected>无</option>
                <option value="平安保险" >平安保险</option>
                <option value="6" >6座</option>
                <option value="7" >7座</option>
              </select></td>
              <td><span class="alter_text">座位数</span></td>
              <td ><select class="alter_select" v-model="afterCustomer.search.座位数">
                <option value="2" >2座</option>
                <option value="3" >3座</option>
                <option value="4" selected>4座</option>
                <option value="5" >5座</option>
                <option value="6" >6座</option>
                <option value="7" >7座</option>
              </select></td>
              <td><span class="alter_text">客户类型</span></td>
              <td ><span class="alter_text">{{afterCustomer.search.客户类型}}</span></td>
            </tr>
            <tr class="alter_tr">
              <td style="height: 50px"><span class="alter_text">地址</span></td>
              <td colspan="4"><textarea class="alter_input_textarea" v-model="afterCustomer.search.地址"></textarea></td>
              <td ><button class="alter_tr_btn" @click="SendAfterCustomer">保存[基本]信息</button></td>
            </tr>
            <tr class="alter_tr">
              <td style="height: 50px"><span class="alter_text">备注</span></td>
              <td colspan="5"><textarea class="alter_input_textarea" v-model="afterCustomer.search.备注"></textarea></td>
            </tr>
            </tbody>
          </table>
        </div>
        <span style="font-size: 20px">{{errorInfo}}</span><br>
        <input class="alter_tr_btns alter_tr_btns_1" type="button" @click="sendStartCustomer('成功')" value="成功" >
        <input class="alter_tr_btns alter_tr_btns_2" type="button" @click="sendStartCustomer('预约')" value="预约" >
        <input class="alter_tr_btns alter_tr_btns_3" type="button" @click="sendStartCustomer('失败')" value="失败" >
        <input class="alter_tr_btns alter_tr_btns_4" type="button" @click="sendStartCustomer('无效')" value="无效" >
        <input class="alter_tr_btns alter_tr_btns_5" type="button" @click="setAfterCustomerDis()" value="取消" >


      </div>
    </div>
  </div>
</template>

<script >
  export default {
    name:"WODE",
    data() {
      return{
        items:{
          search:{
            CarInfo:"",
            State:"ALL",
            Type:"ALL",
            CompulsoryInsurance:{
              startDate:"",
              endDate:""
            },
            RegistrationDate:{
              startDate:"",
              endDate:""
            },
            CustomerService:"ALL",
            binding:false,
            position:"ALL"
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
        AfterCustomerDis:false,
        afterCustomer:{
          info:{
            username: null,//账号
            access_token: null
          },
          search:{
            编号:null,
            客户名称:"",
            车牌号:"",
            车架号:"",
            品牌:"",
            车型号:"",
            发动机号:"",
            固定电话:"",
            手机号码:"",
            身份证号:"",
            登记日期:null,
            交强险日期:null,
            商业险日期:null,
            投保公司:"无",
            座位数:4,
            客户类型:"",
            地址:"",
            备注:"",
            状态:"",
            客服:""
          }

        },
        afterCustomerStart:{
          info:{
            username: null,//账号
            access_token: null
          },
          search:{
            编号:null,
            状态:""
          }
        },
        alter:{
          checkboxModel:[],//获取选项框数据
          CustomerService:"客服",
          info:{
            username: null,//账号
            access_token: null
          }
        },
        ImportInfo:{
          information:{},//获取选项框数据
          info:{
            username: null,//账号
            access_token: null
          }
        },
        delInfo:{
          information:[],//获取选项框数据
          info:{
            username: null,//账号
            access_token: null
          },
          del:false,
          dellist:false,
        },
        CustomerServiceDis:false,
        CustomerService:[],
        CustomerService2:[],
        services:[],
        CS:[],
        ZT:[],
        services_time1:[],
        services_time2:[],
        services_time3:[],
        tfoot:{
          total: 0,     // 记录总条数
          display: 20,   // 每页显示条数
          current: 1,     // 当前第n页 ， 也可以 watch current 的变化
          pagegroup:10
        },
        url:"/getInformation",
        checkAll: false, //全选
        willShow:true,
        CompulsoryInsurance:{
          startDate:"",
          endDate:""
        },
        RegistrationDate:{
          startDate:"",
          endDate:""
        },
        errorInfo:"",
        errorDis:false,
        text111:null
      }
    },
    mounted:function(){
      this.items.info.username = this.getCookie("username");
      this.items.info.access_token = this.getCookie("access_token");
      let self = this;
      setTimeout(self.setData(this.url,this.items),300);
      setTimeout(self.sendGet("/getCustomerService?username="+this.items.info.username+"&access_token="+this.items.info.access_token),300);
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

      setAfterCustomer(value){
        this.setAfterCustomerDis();
        this.afterCustomer.search.编号 = value["编号"];
        this.afterCustomer.search.客户名称 = value["客户名称"];
        this.afterCustomer.search.车牌号 = value["车牌号"];
        this.afterCustomer.search.车架号 = value["车架号"];
        this.afterCustomer.search.品牌 = value["品牌"];
        this.afterCustomer.search.车型号 = value["车型号"];
        this.afterCustomer.search.发动机号 = value["发动机号"];
        if(value["固定电话"]===null||value["固定电话"]==="null"){
          this.afterCustomer.search.固定电话 = "";
        }else {
          this.afterCustomer.search.固定电话 = value["固定电话"];
        }
        if(value["手机"]===null||value["手机"]==="null"){
          this.afterCustomer.search.手机号码 = "";
        }else {
          this.afterCustomer.search.手机号码 = value["手机"];
        }


        this.afterCustomer.search.身份证号 = value["身份证号"];
        this.afterCustomer.search.登记日期 = this.getDates(value["登记日期"]);
        this.afterCustomer.search.交强险日期 = this.getDates(value["交强险日期"]);
        this.afterCustomer.search.商业险日期 = this.getDates(value["商业险日期"]);
        this.afterCustomer.search.投保公司 = value["投保公司"];
        this.afterCustomer.search.座位数 = value["座位数"];
        this.afterCustomer.search.客户类型 = value["客户类型"];
        this.afterCustomer.search.地址 = value["地址"];
        this.afterCustomer.search.备注 = value["备注"];
        this.afterCustomer.search.状态 = value["状态"];
        this.afterCustomer.search.客服 = value["客服"];

        this.afterCustomerStart.search.编号 = value["编号"];
      },
      setAfterCustomerDis(){
        this.AfterCustomerDis = !this.AfterCustomerDis;
        this.errorInfo=""
      },
      SendAfterCustomer(){
        this.afterCustomer.info.username=this.getCookie("username");
        this.afterCustomer.info.access_token=this.getCookie("access_token");
        this.sendPost("/setAfterCustomer",this.afterCustomer)
      },
      sendStartCustomer(value){
        this.afterCustomerStart.info.username=this.getCookie("username");
        this.afterCustomerStart.info.access_token=this.getCookie("access_token");
        this.afterCustomerStart.search.状态 = value;
        this.sendPost("/setStartCustomer",this.afterCustomerStart)
      },


      checkSingle:function(value){
        this.checkAll = false;
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

//      console.log(this.checkAll);
        if (!this.checkAll) {//实现反选
          this.alter.checkboxModel = [];
          this.delInfo.information = [];
//        for (let i=0;i<this.services.length;i++){
//          this.delInfo.information.push(false)
//        }
        }else{//实现全选
          this.alter.checkboxModel = [];
          this.delInfo.information = [];

          for (let i=0;i<this.services.length;i++){
            this.alter.checkboxModel.push(this.services[i]["编号"]);
            this.delInfo.information.push(this.services[i]["编号"])
          }
        }
        console.log(this.delInfo.information)
      },

      delInfoData(value){
        this.delInfo.information.push(value);
        this.delInfo.del = true;
        console.log("delInfoData"+this.delInfo.information)
      },
      delInfoList(){
        this.delInfo.information = this.alter.checkboxModel;
        this.delInfo.dellist = true;
      },
      delInfodel(){
        this.delInfo.information =[];
        this.delInfo.del = false;
        this.delInfo.dellist = false;
      },
      delData(){
        console.log("information:"+this.delInfo.information);
        console.log(this.delInfo);
        this.sendPost("/delInfo",this.delInfo);
      },
      delDataList(){
        if(this.delInfo.information.length!==0){
          this.sendPost("/delInfo",this.delInfo);

        }
      },

      //数据准备
      setData(url,sendData){
        if(this.getCookie("username")===null && this.getCookie("username")===""){
          this.$router.push('../login')
        }else{
          this.items.info.username = this.getCookie("username");
          this.items.info.access_token = this.getCookie("access_token");
          this.alter.info.username=this.getCookie("username");
          this.alter.info.access_token=this.getCookie("access_token");
          this.ImportInfo.info.username = this.getCookie("username");
          this.ImportInfo.info.access_token = this.getCookie("access_token");
          this.delInfo.info.username = this.getCookie("username");
          this.delInfo.info.access_token = this.getCookie("access_token");
          this.items.pages.Request = this.tfoot.current;
          this.items.pages.each_page = this.tfoot.display;
          this.items.search.CustomerService = this.getCookie("NAME");

          this.items.search.CompulsoryInsurance.startDate = new Date(this.CompulsoryInsurance.startDate+" 0:0:0").getTime()/1000;
          this.items.search.CompulsoryInsurance.endDate = new Date(this.CompulsoryInsurance.endDate+" 23:59:59").getTime()/1000;

          this.items.search.RegistrationDate.startDate = new Date(this.RegistrationDate.startDate+" 0:0:0").getTime()/1000;
          this.items.search.RegistrationDate.endDate = new Date(this.RegistrationDate.endDate+" 23:59:59").getTime()/1000;

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
        if(dataSource.code.MessageCode===1001000||dataSource.code.MessageCode===1003000||dataSource.code.MessageCode===1002000||dataSource.code.MessageCode===1002005){
          if(dataSource.code.MessageCode===1001000){
            this.$store.commit("setErrorinfo","");
            this.services = dataSource.information;
            this.CS = [];
            this.ZT = [];
            this.services_time1=[];
            this.services_time2=[];
            this.services_time3=[];
            this.getServicesDate();
            this.tfoot.total = dataSource.pages.total;
          }else if(dataSource.code.MessageCode===1003000||dataSource.code.MessageCode===1002000){
            this.delInfodel();
            this.setData(this.url,this.items)
          }else if(dataSource.code.MessageCode===1002005){
            this.errorInfo=dataSource.code.MsgInfo;
            this.setData(this.url,this.items)
          }

        }else if(dataSource.code.MessageCode===1003001||dataSource.code.MessageCode===1002002){
          this.ErrorInfo(dataSource.code.MsgInfo)
        }else{
          this.$store.commit("setErrorinfo",dataSource.code.MsgInfo);
          this.$router.push('../login');
        }
      },
      getServicesDate(){
        for(let i = 0;this.services.length>i;i++){
          if (this.services[i]["客服"]==="null"||this.services[i]["客服"]==="客服"){
            this.CS.push("—")
          }else {
            this.CS.push(this.services[i]["客服"])
          }
          if (this.services[i]["状态"]==="null"){
            this.ZT.push("未处理")
          }else {
            this.ZT.push(this.services[i]["状态"])
          }
          this.services_time1.push(this.getDates(this.services[i]["商业险日期"]));
          this.services_time2.push(this.getDates(this.services[i]["交强险日期"]));
          this.services_time3.push(this.getDates(this.services[i]["登记日期"]))
//        console.log(this.CS)
        }

      },
      //变更业务员
      ChangeSalesman(){
        this.CustomerServiceDis = !this.CustomerServiceDis;
      },
      //变更业务员
      ChangeSalesman2(value){

        this.CustomerServiceDis = !this.CustomerServiceDis;
        this.alter.checkboxModel=[];
        this.alter.checkboxModel.push(value);
      },
      //变更业务员
      sendPostChangeSalesman(){
        if(this.getCookie("access_token")){
          if(this.alter.checkboxModel.length!==0&&this.alter.CustomerService!=="客服"){
            let self = this;
            this.$ajax.post(self.$store.state.url+"/ChangeSalesman",self.alter, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              if(response.data.code.MessageCode===1001000||response.data.code.MessageCode===1002005){
                self.ChangeSalesman();

                self.setData(self.url,self.items)
              }else {
                self.ErrorInfo(response.data.code.MsgInfo)
              }
            }).catch(function (error) {
              console.log(error);
            });
          }else{
            this.ChangeSalesman();
            this.ErrorInfo("请选择要变更的数据！")
          }
        }else {
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
        let newDate = new Date();
        newDate.setTime(value * 1000);
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
      },
      setBinding:function () {
        this.items.search.binding = !this.items.search.binding
      },
      handleSelectedFile (convertedData) {
        this.ImportInfo.information = convertedData;
        this.sendPost("/ImportInfo",this.ImportInfo);
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
  #WODE{
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
    font-size: 13px;
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
    width: 1000px;
    height: 450px;
    border: 2px solid #00BFFF;
    border-radius: 20px;
    margin-left: 25%;
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
    width: 980px;
    height: 290px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    /*background-color: #d9534f;*/
  }
  .btn_position{
    margin-top: 10px;
  }
  .alter_tr{
    font-size: 15px;
    /*height: 20px;*/
  }
  .alter_text{
    margin-left: 10px;
    float: left;
  }
  input{
    font-weight: 600;
    font-size: 13px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }

  .alter_tr_btn {
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    font-size: 20px;
    font-family: 楷体;
    font-weight: 900;
    border: 1px solid #23527c;
    background-color: #FF3030;
    border-radius: 3px;
  }
  .alter_input{
    width: 95%;
    float: left;
    font-weight: 600;
    font-size: 16px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }
  select{
    width: 100px;
    font-weight: 500;
    font-size: 14px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }
  .alter_select{
    width: 95%;
    float: left;
    font-weight: 500;
    font-size: 18px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }
  .alter_input_textarea{
    float: left;
    width: 99%;
    height: 99%;
    font-size: 12px;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }
  .alter_tr_btns{
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
    font-size: 18px;
    border-radius: 4px;
    color: #fff;
    width: 100px;
    height: 50px;
    margin-top: 10px;
  }
  .alter_tr_btns_1{
    background-color: #FFB90F;
    margin-left: 10px;
  }
  .alter_tr_btns_2{
    background-color: #1E90FF;
    margin-left: 10px;
  }
  .alter_tr_btns_3{
    background-color: #FF4500;
    margin-left: 10px;
  }
  .alter_tr_btns_4{
    background-color: #363636;
    margin-left: 10px;
  }

  .alter_tr_btns_5{
    background-color: #398439;
    width: 100px;
    height: 35px;
    font-size: 15px;
    float: right;
    margin-top: 25px;
    margin-right: 15px;
  }
  .alter_input_date{
    width: 95%;
    float: left;
    font-weight: 600;
    font-size: 16px;
    font-family: 楷体;
    border: 2px solid #CDC9C9;
    border-radius: 5px;
  }

  ::-webkit-inner-spin-button { visibility: hidden; }
  ::-webkit-calendar-picker-indicator {
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: inset 0 1px #fff, 0 1px #eee;
    background-color: #eee;
    background-image: -webkit-linear-gradient(top, #f0f0f0, #e6e6e6);
    color: #666;
  }

</style>
