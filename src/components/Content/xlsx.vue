<template>
  <div id="app">
    <p>Not need upload, view xlsx or xls file in your browser, Supported by js-xlsx.</p>

    <div>
      <vue-xlsx-table @on-select-file="handleSelectedFile" class="btn">
        Select one file
      </vue-xlsx-table>
    </div>
    <hr>
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        msg:null
      }
    },
    methods: {
      handleSelectedFile (convertedData) {
        console.log(convertedData)
        this.msg = JSON.stringify(convertedData);
        window.alert(JSON.stringify(convertedData))
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
  }

  .btn{
    display: -webkit-inline-box;
  }
  .btn1{
    /*display: inline-block;*/
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #20a0ff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
    width: 100px;
  }

  h1, h2, h3 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .t-center{
    text-align: center;
    margin: 20px;
  }
  .mt150{
    margin-top: 150px;
  }
</style>
