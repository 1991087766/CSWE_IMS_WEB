<template>
  <div id="homepage">
      <table>
        <thead>
          <tr>
            <td class="thead_td" colspan="9">选择</td>
          </tr>
          <tr>
            <td>选择</td>
            <td>客服</td>
            <td>车牌号</td>
            <td>车架号</td>
            <td>客户名称</td>
            <td>品牌</td>
            <td>车型号</td>
            <td>发动机号</td>
            <td>手机</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>选择</td>
            <td>客服</td>
            <td>苏E6Z37Z</td>
            <td>LNYFBKA37FV502906</td>
            <td>常熟市辛庄镇维祥针织厂</td>
            <td>依维柯牌</td>
            <td>NJ6484ACM</td>
            <td>15E2887</td>
            <td>18915607866</td>
          </tr>
          <tr>
            <td>L6T7824S4FN232242</td>
            <td>L6T7824S4FN232242</td>
            <td>苏E70AR6</td>
            <td>L6T7824S4FN232242</td>
            <td>王有红</td>
            <td>吉利美日牌</td>
            <td>MR7152L21</td>
            <td>FCCB06453</td>
            <td>18757336903</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="tfoot_td" colspan="9">选项</td>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"homepage"
}
</script>

<style scoped>
#homepage{
  top: 5px;
  left: 15px;
  right: 15px;
  bottom: 5px;
  position: absolute;
}

table {
  width: 100%;
  height: auto;
  top: 0;
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
.tfoot_td{
  height: 40px;
}
.thead_td{
  height: 50px;
}

</stylescoped>
