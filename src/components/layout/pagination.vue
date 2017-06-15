<template>
  <div class="page-bar">
        <ul class="pagination">
            <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
            <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> 上一页 </a></li>
            <li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> 下一页</a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
        </ul>
        <ul class=" pull-right">
            <li><span> 共 {{ total }}  条数据 </span></li>
            <li><span> 共 {{ page }} 页 </span></li>
            <li><span> 当前第 {{ current }} 页 </span></li>
        </ul>
        <ul class="pagination-right">
            <li><a href="javascript:;" @click="setDisData()"> 每页显示 {{ display }}  条数据 </a></li>
        </ul>
  </div>
</template>


<script >
export default {

  name:"pagination",
  template: '#template_pagination',
  data(){
    return{
      willShow:true,
      display:20,
      total:120,
      current:1,
      pagegroup:5
    }
  },
  computed: {
    page:function() { // 总页数
        this.total = this.$store.state.total;
        if(this.total===0){
          return 1
        }else{
          return Math.ceil(this.total / this.display)
        }
    },
    grouplist:function(){ // 获取分页页码
        var len = this.page , temp = [], list = [], count = Math.floor(this.pagegroup / 2) ,center = this.current;
        if( len <= this.pagegroup ){
            while(len--){ temp.push({text:this.page-len,val:this.page-len});};
            return temp;
        }
        while(len--){ temp.push(this.page - len);};
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count -1, this.pagegroup);
        do {
            var t = temp.shift();
            list.push({
                text: t,
                val: t
            });
        }while(temp.length);
        if( this.page > this.pagegroup ){
            (this.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
            (this.current < this.page - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
        }
        return list;
    }
  },
  methods: {
    setCurrent: function(idx) {
        if( this.current !== idx && idx > 0 && idx < this.page + 1) {
            this.current = idx;
            this.$store.commit('setCurrent',this.current)

        }
    },
    setDisData:function(){
      if(this.display===20){
        this.display=50
      }else if(this.display===50){
        this.display=100
      }else if(this.display===100){
        this.display=20
      }
      this.$store.commit('setDisplayPage',this.display)
    }

  }
}
</script>

<style scoped>
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
</style>
