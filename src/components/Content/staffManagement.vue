<template>
  <div id="staffManagement">
    <div class="Title"><span id="contentTitle">部门管理</span></div>
      <table>
        <thead>
          <tr>
            <td colspan="8">
              <input class="input_" type="text" placeholder="客 服、姓 名、部 门、地 点">
              状态:
              <select class="select1" name="select1" id="select_k1" >
                  <option value="0">-全部-</option>
              </select>
              <button  v-on:click="search()" >搜 索</button>
            </td>
          </tr>
          <tr>
            <td>客服</td>
            <td>姓名</td>
            <td>部门</td>
            <td>地点</td>
            <td>状态</td>
            <td>入职日期</td>
            <td>离职日期</td>
            <td>选项</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SD-YW10001</td>
            <td>张三</td>
            <td>业务部</td>
            <td>江苏省苏州市</td>
            <td>在职</td>
            <td>2017.06.12</td>
            <td>-</td>
            <td>修改</td>
          </tr>
          <tr>
            <td>SD-YW10002</td>
            <td>李四</td>
            <td>业务部</td>
            <td>江苏省苏州市</td>
            <td>递交离职</td>
            <td>2017.06.12</td>
            <td>2017.06.12</td>
            <td>修改</td>
          </tr>
          <tr>
            <td>SD-YW10003</td>
            <td>王五</td>
            <td>业务部</td>
            <td>江苏省苏州市</td>
            <td>离职</td>
            <td>2017.06.12</td>
            <td>2017.06.12</td>
            <td>修改</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
              <td colspan="8">
                  <div class="pull-left">
                      <button class="btn btn-default" @click="refresh">刷新</button>
                  </div>
                  <div class="pull-right">
                      <boot-page v-ref:page :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param"></boot-page>
                  </div>
              </td>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script type="text/javascript">
import bootPage from '../BootPage.vue'
export default {
  name:"staffManagement",
  data () {
      return {
          lenArr: [20, 50, 100], // 每页显示长度设置
          pageLen: 5, // 可显示的分页数
          // url: '/bootpage/', // 请求路径
          param: {}, // 传递参数
          lists: [
              {num: 1, author: 'luozh', contents: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: 'dsds'},
              {num: 2, author: 'luozh', contents: '支持调整每页显示行数和页码显示个数，样式基于bootstrap', remark: 'dsds'},
              {num: 3, author: 'luozh', contents: '<boot-page>标签中async指是否从服务器端获取数据，false为否', remark: 'dsds'},
              {num: 4, author: 'luozh', contents: 'data为静态的表格数据数组；', remark: 'dsds'},
              {num: 5, author: 'luozh', contents: 'lens为每页显示行数的数组', remark: 'dsds'},
              {num: 6, author: 'luozh', contents: 'page-len为可显示的页码数', remark: 'dsds'},
              {num: 7, author: 'luozh', contents: '服务器回传参数为{data:[], page_num: 6}, 其中data为表格数据，page_num为总页数', remark: 'dsds'},
              {num: 8, author: 'luozh', contents: '可以调用this.$refs.page.refresh()刷新表格数据', remark: 'dsds'}
          ], // 表格原始数据
          tableList: [] // 分页组件传回的分页后数据
      }
  },
  components: {
      bootPage
  },
  methods: {
      refresh () {
          this.$refs.page.refresh()
      }
  },
  events: {
      // 分页组件传回的表格数据
      'data' (data) {
          this.tableList = data
      },
      // 刷新数据
      'refresh' () {
          this.refresh()
      }
  }
}
</script>

<style scoped>

.pull-left{
  float: left;
  margin-left: 5px;
}
.pull-right{
  float: right;
}
#staffManagement{
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
.select1{

}
.input_{
  width: 200px;
}
.tfoot_td{
  height: 40px;
}

</style>
