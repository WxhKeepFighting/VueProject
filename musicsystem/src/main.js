import Vue from 'vue'//首先导入vue对象
import App from './App.vue'//导入App.vue，并且命名为App
import "bootstrap/dist/css/bootstrap.css"

Vue.config.productionTip = false

new Vue({//创建一个Vue对象
    el: '#app',//设置要被Vue处理的节点是id为app的<div>节点，已经定义过了
    render: h => h(App),
}).$mount('#app')
