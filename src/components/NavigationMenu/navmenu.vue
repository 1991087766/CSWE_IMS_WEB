<template>
  <div id="navmenu">
    <div id="menu">
      <div id="myPage"class="btn">
        <router-link to="/home/mypage"  tag="span"active-class="active">
          我 的 页 面
        </router-link>
      </div>
      <div id="CustomerInfoPage"class="CustomerInfoPage btn">
        <span @click="fn()">客 户 管 理</span>
        <div id="CustomerInfoPageJump"class="CustomerInfoPageJump"v-if="willShow">
          <router-link v-for="name in products" :to="{path:name.path}" tag="li" active-class="active2"  >
              {{name.name}}
          </router-link>
        </div>
      </div>

      <div id="Other" class="Other">
        <ul class="Others" >
          <router-link to="/home/Setting" tag="li"active-class="active">
              个 人 中 心
          </router-link>
          <router-link v-for="name in others" :to="{path:name.path}" tag="li" active-class="active3" v-if="getAdmin">
              {{name.name}}
          </router-link>
        </ul>
      </div>
    </div>
</div>
</template>

<script type="text/javascript">
//import NavMenuSalesmanAdmin from '../NavigationMenu/navmenu_admin.vue'
export default {
  name:"navmenu",
  data(){
    return{
      willShow:true,
      products:[
        {
          name:'山 东',
          path:'/home/CustomerMsd',
          active:false
        },
        {
          name:'苏 州',
          path:'/home/CustomerMsz',
          active:false
        },
        {
          name:'无 锡',
          path:'/home/CustomerMwx',
          active:false
        }
      ],
      others:[
        {
          name:'客 户 管 理',
          path:'/home/CustomerMA',
          active:false
        },
        {
          name:'部 门 管 理',
          path:'/home/StaffManagement',
          active:false
        },
        {
          name:'登 录 I P',
          path:'/home/LoginIP',
          active:false
        },
        {
          name:'操 作 日 志',
          path:'/home/OperationLog',
          active:false
        }
      ]

    }
  },
  methods:{
      fn:function(){
        if(this.willShow===true){
          this.willShow=false;
        }else{
          this.willShow=true
        }
      },
      position:function (position) {
        this.$store.commit('setPosition',position);
        console.log(position);
        console.log(this.$store.state.position);
      },

    getAdmin(){
      if(this.getCookie("admin")===2){
          return true
      }else {
        return false
      }
    },

    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
      }
      return "";
    }

  }
}
</script>

<style scoped>
#navmenu{
  font-family: "STKaiti";
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  height: 100%;
  float: left;
}

#menu{
  width: 100%;
  bottom: 20px;
  top: 20px;
  position: absolute;
}
.btn:hover, .btn:active, .btn.active, .btn.disabled, .btn[disabled] ,li:hover,.active2:hover{
   background-color: #e6e6e6;
 }

.CustomerInfoPage{
  width: 100%;
}
.CustomerInfoPageJump{
  font-size: 20px;
  width: 100px;
  float: right;
  margin-right: 30px
}
.position{
  margin-left: 40px;
}
.direction{
  width: 20px;
  float: right;
  /*margin-right: 10px;*/
}
.Other{
  width: 100%;
  bottom: 0;
  position: absolute;
}

.Others{
  margin-left: -30px;
}
li{
  width: 100%;
  margin-left: -5px;
  float: left;
  list-style-type:none;
}

</style>
