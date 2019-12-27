<template>
  <div id="login" class="login-box">
      <h1>登录验证</h1>
   <el-row>
      <el-col :span="8">
        <el-input id="name" v-model="name" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录验证</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: "Login",
  data(){
      return{
          name:"",
          password:""
      };
  },
  methods:{
      check(){
          Axios.get("http://localhost:8080/Login/"+this.name+"/"+this.password)
          .then(
            ()=>{
              
            }
          );
          this.$router.push({name:'Main',params:{username:this.username}});
      }
  }
};
</script>

<style>
.el-row {
    margin-bottom: 20px;
  }
.login-box {
		margin-top:20%;
		margin-left:40%;
	}
</style>
