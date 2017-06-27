<template>
  <div id="NavMenu">
    <NavMenuSalesman></NavMenuSalesman>

  </div>
</template>

<script type="text/javascript">
import NavMenuSalesman from '../NavigationMenu/navmenu.vue'
export default {
  name:"NavMenu",
  components: {
      NavMenuSalesman
   },
  mounted() {
    if(this.getCookie("username")===null && this.getCookie("username")===""){
      this.$router.push('../login')
    }
  }
}
</script>

<style>
#NavMenu{
  width: 170px;
  height: auto;
  background: url("../../assets/b-left.jpg");
  position: fixed;
  top: 52px;
  left: 2px;
  bottom: 2px;
  border-radius: 5px;
}



</style>
