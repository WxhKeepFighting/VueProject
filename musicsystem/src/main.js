//整个项目的入口文件
import Vue from 'vue'//首先导入vue对象
// import App from './App.vue'//导入App.vue，并且命名为App
// import Login from './components/Login.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import router from './router'
import Index from './pages/index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import "bootstrap/dist/css/bootstrap.css"
// import Main from "./pages/Main.vue";

Vue.config.productionTip = false//生产环境提示
Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({//创建一个Vue对象
    router,
    el: '#app',//必须是#app,不能改变
    render: h => h(Index)
}).$mount('#app')
