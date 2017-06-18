<template>
  <div id="addCustomer">
    <div class="addCustomer">
      <span class="addCustomer_title ">新增客户</span>




    </div>


  </div>
</template>

<script>
  export default {
    name: 'addCustomer'
  }
</script>

<style scoped>
  #addCustomer{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(98, 96, 104, 0.6);
  }
  .addCustomer{
    width: 1000px;
    height: 600px;
    border: 2px solid #00BFFF;
    border-radius: 20px;
    margin-left: 25%;
    margin-top: 5%;
    background-color: #F8F8FF;

  }
  .addCustomer_title{
    display: block;
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    font-family: "楷体";
  }

</style>
