<template>
  <div id="suspendedNews">
      <img id="close" class="close" src="../../assets/close.png">
      <span id = "news_header" class="news_header">系统：标题最长10个字</span>
      <div id="news">
        <span id = "news_cont">系统：这里是消息内容！最长容纳50个汉字，多出的以“...”代替！悬停20S，有新消息时，依次在下方叠加！</span>
        <button class="button_lock">查 看</button>
      </div>

  </div>
</template>

<script>
export default {
  name: 'suspendedNews'
}
</script>

<style scoped>
#suspendedNews{
  width: 300px;
  height: auto;
  position: fixed;
  /*top:52px;*/
  top:302px;
  right: 2px;
  border-radius: 5px;
  background-color: #CCCCCC;
}
#news{
  margin-top: 6px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: left;
}
.news_header{
  font-family: "STKaiti";
  font-weight: bold;
  font-size: 18px;
}
.close{
  width: 20px;
  margin-top: 6px;
  margin-right: 5px;
  float: right;
}
.button_look{
}

</style>
