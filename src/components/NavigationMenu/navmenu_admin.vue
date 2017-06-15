<template>
  <div id="navmenu2">
    <ul id="NavMenu_list2">
      <li>
        <a clase="menu">系统设置</a>
      </li>
      <hr>
      <li>
        <a clase="menu">客户管理</a>
      </li>
      <hr>
      <li>
        <a clase="menu">部门管理</a>
      </li>
      <hr>
      <li>
        <a clase="menu">登陆 I P </a>
      </li>
      <hr>
      <li>
        <a clase="menu">操作日志</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">

export default {
  name:"navmenu2"
}
</script>

<style>
#navmenu2{
  font-family: "STKaiti";
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  float: left;
}
#NavMenu_list2{
  width: 100%;
  margin-left: -40px;
  position: absolute;
  bottom: 0;
}
.NavMenu_list_2{
  font-size: 20px;
  margin-left: -10px;
  display: none;
}
ul li{
  list-style-type: none;
}
.menu{
  /*width: 100px;*/
  /*margin-left: -70px;*/
}
#one_menu #two_menu{
  font-family: "STKaiti";
  font-weight: bold;
}
a{
  margin-left: 0px;
}
hr{
  width: 80%;
  margin: 2px 2px 0 0;
  margin-left: 20px;
}

ul li, ul li:hover ul {
    display: block;
}
ul li ul {
    display: none;
}

</style>
