<template>
  <div id="Suspended">

    <SuspendedNews></SuspendedNews>

  </div>
</template>

<script>
import SuspendedNews from '../suspendeds/SuspendedNews.vue'
export default {
  name: 'Suspended',
  components: {
      SuspendedNews
   }
}
</script>

<style>
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
</style>
