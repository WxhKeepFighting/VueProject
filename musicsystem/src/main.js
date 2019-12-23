//整个项目的入口文件
import Vue from 'vue'//首先导入vue对象
import App from './App.vue'//导入App.vue，并且命名为App
// import Login from './components/Login.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import "bootstrap/dist/css/bootstrap.css"

Vue.config.productionTip = false//生产环境提示
Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({//创建一个Vue对象
    router,
    el: '#app',//设置要被Vue处理的节点是id为app的<div>节点，已经定义过了
    render: h => h(App)
}).$mount('#app')
