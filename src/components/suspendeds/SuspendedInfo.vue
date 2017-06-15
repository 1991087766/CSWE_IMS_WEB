<template>
  <div id="devices">
    <div class="Title"><span id="contentTitle">设备管理</span></div>
      <table>
        <thead>
          <tr>
            <td colspan="14">
              <select v-model="item.parameter.search.type">
                <option value="0">设备类型</option>
                <option value="1">手机</option>
                <option value="2">pad</option>
                <option value="3">其他</option>
              </select>
              <select v-model="item.parameter.search.system">
                <option value="0">操作系统</option>
                <option value="1">Android</option>
                <option value="2">IOS</option>
                <option value="3">其他</option>
              </select>
              <select v-model="item.parameter.search.state">
                <option value="0">使用状态</option>
                <option value="1">空闲中</option>
                <option value="2">使用中</option>
                <option value="3">已损坏</option>
              </select>
              <input class="input_" type="text" v-model="item.parameter.search.number" placeholder="设备编号">
              <input class="input_" type="text" v-model="item.parameter.search.owner" placeholder="拥有人">
              <input class="input_" type="text" v-model="item.parameter.search.previous" placeholder="上一使用人">
              <input class="input_" type="text" v-model="item.parameter.search.use" placeholder="使用人">
              <button  v-on:click="search()" @keyup.enter="submit">搜 索</button>
            </td>
          </tr>
          <tr>
            <td>设备类型</td>
            <td>品牌</td>
            <td>名称</td>
            <td>编号</td>
            <td>操作系统</td>
            <td>系统版本</td>
            <td>分辨率</td>
            <td>屏幕尺寸</td>
            <td>拥有人</td>
            <td>部门</td>
            <td>状态</td>
            <td>上次借用</td>
            <td>当前</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in info">
            <td>{{row["type"]}}</td>
            <td>{{row["brand"]}}</td>
            <td>{{row["phoneName"]}}</td>
            <td>{{row["number"]}}</td>
            <td>{{row["system"]}}</td>
            <td>{{row["version"]}}</td>
            <td>{{row["resolvingPower"]}}</td>
            <td>{{row["screenSize"]}}</td>
            <td>{{row["Owner"]}}</td>
            <td>{{row["department"]}}</td>
            <td>{{row["state"]}}</td>
            <td>{{row["lastBorrower"]}}</td>
            <td>{{row["currentBorrower"]}}</td>
            <td><input type="button" value="借用" @click="operation(row['number'])"></td>
          </tr>

        </tbody>
        <tfoot>
          <tr>
            <td class="tfoot_td" colspan="14">选项</td>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script type="text/javascript">

export default {
  name:"devices",
  data(){
    return{
      item: {
        parameter:{
          username: null,
          access_token: null,
          search:{
            type:0,//
            state:0,//
            number:null,//
            owner:null,//
            previous:null,//
            use:null,//
            system:0//
          }
        }
      },
      info:[],
      url:"/devices"
    }
  },
  methods:{
    operation:function(value){
      console.log(value)
    },
    search: function(){
      var self = this
      self.item.parameter.username=self.$store.state.username
      self.item.parameter.access_token=self.$store.state.access_token
      var JSONitem = JSON.stringify(self.item)
      function createXmlHttpRequest(){
        if(window.ActiveXObject){ //如果是IE浏览器
          return new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){ //非IE浏览器
          return new XMLHttpRequest();
        }
      }
      var xmlHttpRequest = createXmlHttpRequest()
      xmlHttpRequest.open("POST",encodeURI(self.$store.state.url+self.url),true)
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xmlHttpRequest.onreadystatechange=function(){
        if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){

          // console.log(xmlHttpRequest.responseText)
          var json = eval("("+xmlHttpRequest.responseText+")")
          self.info=json["info"]
          console.log(self.info)
          console.log(self.info[1]["number"])
          console.log(json["info"][1]["number"])

          console.log(self.$store.state.access_token)
          console.log(json["data"]["token"])


          if(Boolean(json["data"]["status"])==true
            && json["data"]["token"]!=self.$store.state.access_token
          ){
            self.$store.commit('setAccess_token',json["data"]["token"])
            self.info=json["info"]
            console.log("11111")
          }
          xmlHttpRequest= null
        }
      }
      xmlHttpRequest.send(encodeURI(JSONitem))
    }
  }
}
</script>

<style scoped>
#devices{
  top: 5px;
  left: 15px;
  right: 15px;
  bottom: 5px;
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
table {
  width: 100%;
  height: auto;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align:center;
  position: absolute;
  border-collapse: collapse;
  border:2px solid #778899;
}
thead{
  top: 0;
  left: 0;
  right: 0;
  bottom: 40;
  font-size: 16px;
  text-align:center;
  background-color: #4EEE94;
}

.input_{
  width: 60px;
}

td{
  word-break: break-all;
  min-width: auto;
  height: 25px;
  border:2px solid #778899;
}
tbody{
  font-size: 14px;
}
tfoot{
  /*position: fixed;
  bottom: 20px;*/
}
.tfoot_td{
  height: 40px;
}

</style>
