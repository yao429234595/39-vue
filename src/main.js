import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 1. 引入EelementUI库
import ElementUI from 'element-ui';
// 2. 引入CSS文件
import 'element-ui/lib/theme-chalk/index.css';

import './assets/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  console.log("导航守卫开始工作了了")
  // next()
  console.log(to, from)
  if(to.path == "/login") {
    next()
    return
  }
  if(localStorage.getItem("token")){
    next()
  }else {
    router.push("/login")
  }

})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
