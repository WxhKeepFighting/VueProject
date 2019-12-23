import Vue from 'vue'//首先导入vue对象
import VueRouter from 'vue-router'
import App from './App.vue'//导入App.vue，并且命名为App
import Login from './components/Login.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'Login',
            component:Login//首页
        },
        {
            path:'/app',//二级页面
            name:'App',
            component:App
        }
    ],
    mode:'history' //去掉路径中的“#”
})