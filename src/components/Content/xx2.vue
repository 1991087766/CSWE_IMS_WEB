<template>
  <div id="xlsx">
    <h1>Vue-xlsx-table</h1>
    <input type="file" id="FileInput" hidden="hidden" style="display: none;" @change="read_(this.value)" />
    <div id="app">
      <div class="nav-bar">
        <div class="btn-toolbar" role="toolbar">
          <div class="input-group" style="width: 451px;" onclick="$('#FileInput')[0].click()">
					<span class="input-group-btn">
				        <button class="btn btn-info" type="button" ><i class="glyphicon glyphicon-folder-open"></i>选择文件</button>
				      </span>
            <input type="text" class="form-control" placeholder="请选择文件" readonly="readonly" v-model="fileInfo.name">
          </div>
          <div class="input-group" style="width: 151px;">
					<span class="input-group-btn"  style="font-size: 10px;line-height: 30px;">
				{{'文件大小:'+fileInfo.size+'b'}}
					</span>
          </div>
        </div>
      </div>
      <div id="demo" style="overflow: auto;" v-if="tableDemo.tbody.length>0">
        <table class="table table-bordered" style="min-width: 100%;">
          <thead>
          <tr>
            <th>#</th>
            <th v-for="i in tableDemo.thead">
              {{i}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i,index) in tableDemo.tbody">
            <th scope="row">{{index}}</th>
            <td v-for="j in tableDemo.thead">{{i[j]}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  //  import '../../assets/js/xlsx.full.min'
  import '../../assets/js/vue.min'
  import '../../assets/js/jquery.min'
  export default {
    data(){
      return{
        rABS: false, //是否将文件读取为二进制字符串
        fileInfo: {
          name: "",
          size: 0
        },
        tableDemo: {
          thead: [],
          tbody: []
        }
      }
    },
    methods:{
      read_:function (fls) {
        console.log(fls);
        let ImportFile = null;
        if (fls && fls.length > 0) {
          ImportFile = fls[0];
          let fileX = ImportFile.name.split(".").reverse()[0];
          let fileXyes = false;
          ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].forEach(function (value, index, array) {
            if (fileX === value) {
              fileXyes = true;
            }
          });
          if (fileXyes) {
            app.fileInfo.name = ImportFile.name;
            app.fileInfo.size = ImportFile.size;
            this.file2Xce(ImportFile).then(function (t) {
              console.log("执行完毕");
              if (t && t.length > 0) {
                let tmpHead = [];
                let pmodel = {};
                for (let itm in t[0]) {
                  tmpHead.push(itm);
                  pmodel[itm] = itm;
                }
                app.tableDemo.thead = tmpHead;
                app.tableDemo.tbody = t;
              }
            });
          } else {
            alert("格式错误！请重新选择");
          }
        }
      },
      //读取完成的数据　
      file2Xce: function (f) {
        let wb;
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = e.target.result;
            if (app.rABS) {
              wb = XLSX.read(btoa(this.fixdata(data)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(data, {
                type: 'binary'
              });
            }
            resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
          };
          if (app.rABS) {
            reader.readAsArrayBuffer(f);
          } else {
            reader.readAsBinaryString(f);
          }
        });
      },

      fixdata:function (data) { //文件流转BinaryString
        let o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      }
    }

  }
</script>

<style scoped>
  #xlsx {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
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
  * {
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: "微软雅黑";
    min-height: 95%;
    width: 100%;
  }

  .nav-bar {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  button i.glyphicon {
    margin-right: 4px;
  }

  table.table th {
    word-break: keep-all;
    white-space: nowrap;
  }
</style>



// WEBPACK FOOTER //
// App.vue?043fc673
