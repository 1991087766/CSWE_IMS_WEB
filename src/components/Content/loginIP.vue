<template>

  <div id="loginIP">
    <div class="Title"><span id="contentTitle">登陆IP管理</span></div>
      <table>
        <thead>
          <tr>
            <td colspan="4">
              <input class="input_" type="text" v-model="item.parameter.info.number" placeholder="客 服">
              <input class="input_" type="text" v-model="item.parameter.info.owner" placeholder="姓 名">
              <input class="input_" type="text" v-model="item.parameter.info.owner" placeholder="地 点">
              <input class="input_" type="text" v-model="item.parameter.info.owner" placeholder="I P">
              <button  v-on:click="search()" @keyup.enter="submit">搜 索</button>
            </td>
          </tr>
          <tr>
            <td>客服</td>
            <td>姓名</td>
            <td>部门</td>
            <td>地点</td>
            <td>IP</td>
            <td>日期</td>
            <td>选项</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SD-YW10001</td>
            <td>张三</td>
            <td>业务部</td>
            <td>江苏省苏州市</td>
            <td>127.0.0.1</td>
            <td>4/26/16</td>
            <td>选项</td>
          </tr>
          <tr>
            <td>SD-YW10002</td>
            <td>李四</td>
            <td>业务部</td>
            <td>江苏省苏州市</td>
            <td>127.0.0.2</td>
            <td>4/26/16</td>
            <td>选项</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="tfoot_td" colspan="7">选项</td>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"loginIP"
}
</script>

<style scoped>
#loginIP{
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
