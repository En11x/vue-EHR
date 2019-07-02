// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import moment from "moment";

import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

moment.locale("zh-cn");

const API_ROOT = "http://127.0.0.1:3000";

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.Accept = "application/json";

Vue.prototype.$axios = axios;
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

//导出表格的方法
Vue.prototype.$exportExcel = exportExcel
function exportExcel(excelData,header,headerVal) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/Export2Excel')
        //设置excel的表格的第一行标题
        const tHeader = header
        //tableData 里的数据属性
        const filterVal = headerVal
        const list = excelData
        const data = this.$formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
    })
}

Vue.prototype.$formatJson = formatJson
function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}

Vue.prototype.$moment = moment;

Vue.toast = Vue.prototype.$toast = (msg, type = "success") => {
  Vue.prototype.$message({
    showClose: true,
    message: msg,
    type: type
  });
};

if (process.env.NODE_ENV === "development") {
  require("./elementUI/elementUI");
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
