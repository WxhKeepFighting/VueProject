<template>
  <!-- bootstrap响应式布局grid -->
  <div id="main" class="container">
      <router-view></router-view>
    <h1 style="text-align:center">音乐管理系统</h1>
    <div class="form-group">
      <center>
        <table class="table table-striped mt-5">
          <thead>
            <th>批量删除</th>
            <th>ID</th>
            <th>歌曲名称</th>
            <th>歌曲作者</th>
            <th>status</th>
            <th>发行日期</th>
            <th>资源</th>
            <th>评论</th>
            <th>操作</th>
          </thead>
          <tbody>
            <!-- v-bind 根据id变化来更新 -->
            <tr v-for="music in musicList" :key="music.id">
              <td>
                <input type="checkbox" :value="music.id" v-model="check" />
                <label>{{check}}</label>
              </td>
              <td>{{music.id}}</td>
              <td>{{music.name}}</td>
              <td>{{music.author}}</td>
              <td>{{music.status}}</td>
              <td>{{music.date}}</td>
              <td>
                <a :href="'http://localhost:8080/musics/attachment/'+music.id">{{music.file}}</a>
              </td>
              <td>{{music.comment}}</td>
              <td>
                <button
                  @click="setEditForm(music.id,music.name,music.author, music.status, music.date, music.comment)"
                  class="btn btn-info mr-4"
                >更新</button>
                <button @click="remove(music.id)" class="btn btn-danger">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
      <nav aria-label="Page navigation example">
        <ul class="list-group list-group-horizontal justify-content-center">
          <li class="list-group-item">
              <span aria-hidden="true" @click="getmusic(currentPage - 1)">&laquo;</span>
          </li>
          <li class="list-group-item" v-for="n in count" :key="n" @click="getmusic(n)">
              {{n}}
          </li>
          <li class="list-group-item">
              <span aria-hidden="true" @click="getmusic(currentPage + 1)">&raquo;</span>
          </li>
        </ul>
        <!-- <ul class="pagination justify-content-center pagination-lg">
          <li class="page-item">
            <a href="#">&laquo;</a>
          </li>
          <li class="page-item">
            <a href="#" v-for="n in count" :key="n">{{n}}</a>
          </li>
          <li class="page-item">
            <a href="#">&raquo;</a>
          </li>
        </ul>-->
      </nav>
      <div v-if="AddForm">
        <!-- <div class="form-group row">
          <label for="author" class="col-form-label col-sm-1">
            <span style="color: red">*</span>ID:
          </label>
          <div class="col-sm-7">
            <input
              type="text"
              class="form-control"
              id="id"
              placeholder="请输入歌曲ID"
              v-model="mymusic.id"
              required
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.id != ''"
          >{{errors.id}}</div>
        </div>-->

        <div class="form-group row">
          <!--  col-form-label -->
          <label for="name" class="col-form-label col-sm-1">
            <span style="color: red">*</span>名称:
          </label>
          <div class="col-sm-7">
            <input
              class="form-control"
              type="text"
              id="name"
              placeholder="请输入歌曲名称"
              v-model="mymusic.name"
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.name != ''"
          >{{errors.name}}</div>
        </div>
        <div class="form-group row">
          <label for="author" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>作者:
          </label>
          <div class="col-sm-7">
            <input
              type="text"
              class="form-control"
              id="author"
              placeholder="请输入歌曲作者"
              v-model="mymusic.author"
              required
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.author != ''"
          >{{errors.author}}</div>
        </div>

        <div class="form-group row">
          <label for="type" class="col-form-label col-sm-1">
            <span style="color: red">*</span>status:
          </label>
          <div class="col-sm-7">
            <input
              type="radio"
              id="a"
              value="true"
              v-model="mymusic.status"
              @click="mymusic.status = true"
            />
            <label for="a" class="col-form-label col-sm-2">发行</label>
            <input
              type="radio"
              id="b"
              value="false"
              v-model="mymusic.status"
              @click="mymusic.status = false"
            />
            <label for="b" class="col-form-label col-sm-2">未发行</label>
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.status != ''"
          >{{errors.status}}</div>
        </div>

        <div class="form-group row">
          <label for="date" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>日期:
          </label>
          <div class="col-sm-7">
            <input type="date" class="form-control" id="date" v-model="mymusic.date" />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.date != ''"
          >{{errors.date}}</div>
        </div>

        <div class="form-group row">
          <label for="comment" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>描述:
          </label>
          <div class="col-sm-7">
            <textarea
              type="text"
              rows="10"
              v-model="mymusic.comment"
              placeholder="歌曲描述"
              class="form-control"
              id="comment"
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.comment != ''"
          >{{errors.comment}}</div>
        </div>

        <div class="form-group row">
          <label for="file" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>附件:
          </label>
          <div class="col-sm-7">
            <input type="file" placeholder="歌曲资源" ref="inputFile" class="form-control" id="file" />
          </div>
          <!-- <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.comment != ''"
          >
              {{errors.comment}}
          </div>-->
        </div>

        <button @click="onSubmit()" class="btn btn-primary">添加</button>
      </div>

      <div v-if="EditForm">
        <div class="form-group row">
          <label for="name" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>歌名:
          </label>
          <div class="col-sm-7">
            <input
              class="form-control"
              type="text"
              id="name"
              placeholder="请输入歌曲名称"
              v-model="mymusic.name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="author" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>作者:
          </label>
          <div class="col-sm-7">
            <input
              type="text"
              class="form-control"
              id="author"
              placeholder="请输入歌曲作者"
              v-model="mymusic.author"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="type" class="col-form-label col-sm-1">
            <span style="color: red">*</span>status:
          </label>
          <div class="col-sm-7">
            <label for="a" class="col-form-label col-sm-2">发行</label>
            <input
              type="radio"
              id="a"
              value="true"
              v-model="mymusic.status"
              @click="mymusic.status = true"
            />
            <label for="b" class="col-form-label col-sm-2">未发行</label>
            <input
              type="radio"
              id="b"
              value="false"
              v-model="mymusic.status"
              @click="mymusic.status = false"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="date" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>日期:
          </label>
          <div class="col-sm-7">
            <input type="date" class="form-control" id="date" v-model="mymusic.date" />
          </div>
        </div>

        <div class="form-group row">
          <label for="comment" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>评论:
          </label>
          <div class="col-sm-7">
            <textarea
              type="text"
              rows="10"
              v-model="mymusic.comment"
              placeholder="歌曲评论"
              class="form-control"
              id="comment"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="E_file" class="col-sm-1 col-form-label">
            <span style="color: red">*</span>资源:
          </label>
          <div class="col-sm-7">
            <input type="file" placeholder="歌曲资源" ref="editFile" class="form-control" id="E_file" />
          </div>
        </div>

        <button
          @click="updateById(mymusic.id,mymusic.name,mymusic.author,mymusic.status,mymusic.date,mymusic.comment)"
          class="btn btn-primary"
        >更新</button>
      </div>
    </div>
    <div class="form-group row">
      <label for="select_type" class="col-sm-1 col-form-label">
        <span style="color: red">*</span>查询:
      </label>
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="请输入歌手姓名或者id"
          class="form-control"
          id="select_type"
          v-model="searchtype"
        />
      </div>
      <button @click="findByType()" class="btn btn-primary mr-2">类型查询</button>
      <button @click="findById()" class="btn btn-primary">Id查询</button>
    </div>

    <div>
      <button @click="getmusic(1)" class="btn btn-primary" style="margin: 0 10px 0 0 ">查询所有</button>
      <button
        @click="AddForm = true;EditForm = false"
        class="btn btn-primary"
        style="margin: 0 10px 0 0 "
      >添加歌曲</button>
      <button class="btn btn-primary" @click="deleteMany()">批量删除</button>
    </div>
    <br />
  </div>
  <!-- <span>传入的json数组的长度为:{{musics.length}}</span>  -->
</template>

<script>
import Axios from "axios";
// import Login from "./components/Login";
// import HelloWorld from "./components/HelloWorld"
//也是json格式
export default {
  name: "App", //将vue命名为App
  mounted:function(){
      this.username = this.$route.params.username;
      alert(this.username);
  },
  components: {
    // Login
    // HelloWorld
  },
  //页面加载之前就执行的操作
  created() {
      Axios.get("http://localhost:8080/musics").then(
        response => {
            // response.data只是表示获取响应体data.后面的才表示各个项的内容
            this.list_length = response.data.data.length;//获取总的数据个数
            console.log(this.list_length);//15
            this.pageNum = Math.ceil(this.list_length/this.pageSize);//向上取整求总页数
            console.log(this.pageNum);//3
            for(let i = 1; i <= this.pageNum; i++){//设置页码数
                this.count.push(i);
            }
            this.getmusic(1);
            }
      );
      this.num += 1;
      console.log("create执行次数为"+this.num);
  },
  data() {
    return {
      username:"",
      EditForm: false,
      AddForm: false,
      check: [],
      musicList: [],
      //用来定义错误类型，方便输出
      errors: {
        id: "",
        name: "",
        author: "",
        status: "",
        date: "",
        comment: ""
      },
      mymusic: {
        id: 0,
        name: "",
        author: "",
        status: "",
        date: "",
        comment: "",
        file: ""
      },
      searchtype: "",
      count: [],
      currentPage: 0,//当前页
      pageSize: 5,
      list_length:0,
      pageNum:0,//总页数
      num:0
    };
  },
  methods: {
    //实现点击一下显示相应页面的信息
    getmusic(n) {
        if(n > this.pageNum){//越界判断
            this.currentPage = this.pageNum;
        }else{
            if(n < 1){
                this.currentPage = 1;
            }else{
                this.currentPage = n; //更新当前页
                Axios.get(//可以做到在表格中显示相应的信息，问题？如何实现点击相应的页数显示相应的信息
        "http://localhost:8080/musics/page/" +
          this.currentPage +
          "/" +
          this.pageSize
      ).then(response => {        
        this.musicList = response.data.data.content;
      });
            }
        }
        console.log(this.currentPage);
    },
    deleteMany() {
      Axios.delete(
        "http://localhost:8080/musics/batch_delete/" + this.check
      ).then(
          (response) => {
            if(response.data.isok){
                this.getmusic(this.currentPage);
                alert("批量删除成功")
            }else{
                alert(response.data.message);
            }
      });
      this.check = []; //删除完将数组置空
    },
    onSubmit() {
      this.errors.id = ""; //错误信息清空
      this.errors.comment = "";
      this.errors.author = "";
      this.errors.date = "";
      let body = new FormData();
      //   body.append("id", this.mymusic.id);
      body.append("name", this.mymusic.name);
      body.append("author", this.mymusic.author);
      body.append("status", this.mymusic.status);
      body.append("comment", this.mymusic.comment);
      body.append("date", this.mymusic.date);
      body.append("file", this.$refs.inputFile.files[0]);

      let header = {
        "Content-Type": "application/form-data"
      };

      let flag = false; //判断是否报错

      Axios.post("http://localhost:8080/musics", body, header)
        .then(
          (response) => {
              if(response.data == "success"){
                  this.getmusic(this.pageNum);
                  alert("添加成功");
                  this.AddForm = false;
              }else{
                  alert("添加失败");
              }
            
          }
        )
        .catch(error => {
          flag = true; //报错了不需要清空输入框
          let messages = error.response.data.split(',');
          let field = messages[0];
          let defaultMessage = messages[1]; 
          console.log(field+defaultMessage);
          //   写成一个通用的错误信息提取的库
          if (messages) {
              if (field == "id") {
                this.errors.id = defaultMessage;
              }
              if(field == "name"){
                  this.errors.name = defaultMessage;
              }
              if (field == "comment") {
                this.errors.comment = defaultMessage;
              }
              if (field == "date") {
                this.errors.date = defaultMessage;
              }
              if (field == "author") {
                this.errors.author = defaultMessage;
              }
              if (field == "status") {
                this.errors.status = defaultMessage;
              }
            }
            else {
                this.errors.id = "输入的ID号已存在";
            }
        });
      if (flag) {
        //没有出错则清空输入输出框
        this.mymusic.id = 0;
        this.mymusic.name = "";
        this.mymusic.author = "";
        this.mymusic.status = "";
        this.mymusic.date = "";
        this.mymusic.comment = "";
      }
    },
    findByType() {
      Axios.get("http://localhost:8080/musics/type/" + this.searchtype).then(
        response => {
            if(response.data.isok){
                this.musicList = response.data.data;
            }else{
                alert(response.data.message);
            }
        //   if (response.data == null) {
        //     console.log("输入的歌手不存在!");
        //   } else {
        //     this.musicList = response.data;
        //     this.searchtype = "";
        //   }
        }
      );
    },
    findById() {
      Axios.get("http://localhost:8080/musics/" + this.searchtype).then(
        response => {
          if (response.data.isok) {
            this.musicList = response.data.data;
            this.searchtype = "";
          } else {
            alert(response.data.message);  
          }
        }
      );
    },
    remove(id) {
      Axios.delete(`http://localhost:8080/musics/${id}`).then(
        (response) => {
            if(response.data.isok){
                this.getmusic(this.currentPage);
                alert("删除成功！")
            }else{
                alert(response.data.message);
            }    
        }
        //   this.musicList = this.musicList.filter()
      );
    },
    updateById(id, name, author, status, date, comment) {
      let body = new FormData();
      //   body.append("id", id);
      body.append("name", name);
      body.append("author", author);
      body.append("status", status);
      body.append("date", date);
      body.append("comment", comment);
      body.append("file", this.$refs.editFile.files[0]);
      let header = {
        "Content-Type": "application/form-data"
      };
      Axios.put(`http://localhost:8080/musics/${id}`, body, header).then(
        response => {
          if(!response.data.isok){
              alert("更新失败"+response.data.message);             
          }
           this.getmusic(this.currentPage);
           alert("更新成功!");
           this.EditForm = false;
        }
      );
      console.log("执行完了更新操作");
      this.mymusic.id = "";
      this.mymusic.name = "";
      this.mymusic.author = "";
      this.mymusic.status = "";
      this.mymusic.date = "";
      this.mymusic.comment = "";
    },
    //点击更新然后再输入框显示未更新的内容
    setEditForm(id, name, author, status, date, comment) {
      this.EditForm = !this.EditForm;
      if (this.AddForm) {
        this.AddForm = !this.AddForm;
      }
      this.mymusic.id = id;
      this.mymusic.name = name;
      this.mymusic.author = author;
      this.mymusic.status = status;
      this.mymusic.date = date;
      this.mymusic.comment = comment;
    }
    // uploadSectionFile(param) {
    //   let form = new FormData();
    //   form.append("file", param.file);
    //   form.append("dir", "temp1");
    //   Axios.post("http://localhost/upload", form, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     },
    //     onUploadProgress:
    //       ((ProgressEvent.loaded / ProgressEvent.total) * 100) | 0
    //   })
    //     .then(() => {
    //       window.console.log("上传结束");
    //     })
    //     .catch(() => {
    //       window.console.log("上传错误");
    //     });
    // }
  }
};
</script>

<style>
#main table {
  margin-top: 80px;
  /* margin: auto; */
}

label {
  font-size: 3ex;
  padding: 5px 0 0 0;
}
</style>
