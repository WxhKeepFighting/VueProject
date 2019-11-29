<template>
  <!-- bootstrap响应式布局grid -->
  <div id="app" class="container">
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
            <tr v-for="music in musicList" :key="music" v-bind="music.id">
              <td><input type="checkbox" v-model="check"></td>  
              <td>{{music.id}}</td>
              <td>{{music.musicname}}</td>
              <td>{{music.musicauthor}}</td>
              <td>{{music.status}}</td>
              <td>{{music.release_date}}</td>
              <td>
                <a :href="'http://localhost:8080/musics/attachment/'+music.id">{{music.file}}</a>
              </td>
              <td>{{music.comment}}</td>
              <td>
                <button
                  @click="setEditForm(music.id,music.musicname,music.musicauthor, music.status, music.release_date, music.comment)"
                  class="btn btn-info mr-4"
                >更新</button>
                <button @click="remove(music.id)" class="btn btn-danger">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
      <div v-if="AddForm">
        <div class="form-group row">
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
        </div>

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
              v-model="mymusic.musicname"
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.musicname != ''"
          >{{errors.musicname}}</div>
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
              v-model="mymusic.musicauthor"
              required
            />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.musicauthor != ''"
          >{{errors.musicauthor}}</div>
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
            <input type="date" class="form-control" id="date" v-model="mymusic.release_date" />
          </div>
          <div
            class="alert alert-danger col-sm-4"
            role="alert"
            style="padding: 6px 0 0 10px; margin: 0;"
            v-if="errors.release_date != ''"
          >{{errors.release_date}}</div>
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
              v-model="mymusic.musicname"
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
              v-model="mymusic.musicauthor"
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
            <input type="date" class="form-control" id="date" v-model="mymusic.release_date" />
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
          @click="updateById(mymusic.id,mymusic.musicname,mymusic.musicauthor,mymusic.status,mymusic.release_date,mymusic.comment)"
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

    <br />
    <br />
    <button @click="getmusic()" class="btn btn-primary">查询所有</button>
    <br />
    <button
      @click="AddForm = true;EditForm = false"
      class="btn btn-primary"
      style="margin: 20px 0 0 0"
    >添加歌曲</button>
  </div>
  <!-- <span>传入的json数组的长度为:{{musics.length}}</span>  -->
</template>

<script>
import Axios from "axios";
//也是json格式
export default {
  name: "App", //将vue命名为App
  //页面加载之前就执行的操作
  created() {
    this.getmusic();
  },
  data() {
    return {
      EditForm: false,
      AddForm: false,
      check:[],
      musicList: [],
      //用来定义错误类型，方便输出
      errors: {
        id: "",
        musicname: "",
        musicauthor: "",
        status: "",
        release_date: "",
        comment: ""
      },
      mymusic: {
        id: 0,
        musicname: "",
        musicauthor: "",
        status: "",
        release_date: "",
        comment: "",
        file:""
      },
      searchtype: ""
    };
  },
  methods: {
    getmusic() {
      Axios.get("http://localhost:8080/musics").then(
        response => (this.musicList = response.data)
      ); //这里传入的是一个json数组
    },
    onSubmit() {
      //字段验证
      //   if(body.id == ''||body.id<=0){
      //       this.errors = "";
      //   }
      this.errors.id = ""; //错误信息清空
      this.errors.comment = "";
      let body = new FormData();
      body.append("id", this.mymusic.id);
      body.append("musicname", this.mymusic.musicname);
      body.append("musicauthor", this.mymusic.musicauthor);
      body.append("status", this.mymusic.status);
      body.append("comment",this.mymusic.comment);
      body.append("release_date", this.mymusic.release_date);
      body.append("file", this.$refs.inputFile.files[0]);

      let header = {
        "Content-Type": "application/form-data"
      };

      let flag = false; //判断是否报错

      Axios.post("http://localhost:8080/musics", body, header)
        .then(
          this.getmusic
        //   response =>
        //   {
        //     response.data = this.mymusic;
        //     this.musicList.push({
        //       id: this.mymusic.id,
        //       musicname: this.mymusic.musicname,
        //       musicauthor: this.mymusic.musicauthor,
        //       status: this.mymusic.status,
        //       release_date: this.mymusic.release_date,
        //       comment: this.mymusic.comment,
        //       file: this.mymusic.file
        //     })
        //   }
          //   this.musicList.push(body),
        )
        .catch(error => {
          flag = true; //报错了不需要清空输入框
          let messages = error.response.data;
          window.console.log(messages);
          //   写成一个通用的错误信息提取的库
          if (messages) {
            messages.forEach(element => {
              if (element.field == "id") {
                this.errors.id = element.defaultMessage;
              }
              if (element.field == "comment") {
                this.errors.comment = element.defaultMessage;
              }
            });
          } else {
            this.errors.id = "输入的ID号已存在";
          }
        });
      if (flag) {
        //没有出错则清空输入输出框
        this.mymusic.id = 0;
        this.mymusic.musicname = "";
        this.mymusic.musicauthor = "";
        this.mymusic.status = "";
        this.mymusic.release_date = "";
        this.mymusic.comment = "";
      }
      // this.AddForm = false;
    },
    findByType() {
      Axios.get("http://localhost:8080/musics/type/" + this.searchtype).then(
        response =>
          {
            if (response.data == null) {
              window.console.log("输入的歌手不存在!");
            } else {
              this.musicList = response.data;
              this.searchtype = "";
            }
          }
      );
    },
    findById(){
        Axios.get("http://localhost:8080/musics/"+this.searchtype).then(
            response =>
            {
            if (response.data == null) {
              window.console.log("输入的歌手不存在!");
            } else {
              this.musicList = response.data;
              this.searchtype = "";
            }
            }
        );
    },
    remove(id) {
      Axios.delete(`http://localhost:8080/musics/${id}`).then(
        this.getmusic
        //   this.musicList = this.musicList.filter()
      );
    },
    updateById(id,name,author,status,release_date,comment) {
      let body = new FormData();
      body.append("id", id);
      body.append("musicname", name);
      body.append("musicauthor", author);
      body.append("status", status);
      body.append("release_date", release_date);
      body.append("comment",comment);
      body.append("file", this.$refs.editFile.files[0]);
      let header = {
        "Content-Type": "application/form-data"
      };
      Axios.put(`http://localhost:8080/musics/${id}`,body, header).then(
        this.getmusic,
        this.EditForm = false
        // () => {
        //     this.musicList = this.musicList.map(
        //         music => music.id == body.id ? body : music
        //     );
        //     (this.EditForm = false);
        // }
        
      );
      this.mymusic.id = "";
      this.mymusic.musicname = "";
      this.mymusic.musicauthor = "";
      this.mymusic.status = "";
      this.mymusic.release_date = "";
      this.mymusic.comment = "";
    },
    setEditForm(id, musicname, musicauthor, status, release_date, comment) {//点击更新然后再输入框显示未更新的内容
      this.EditForm = !this.EditForm;
      if (this.AddForm) {
        this.AddForm = !this.AddForm;
      }
      this.mymusic.id = id;
      this.mymusic.musicname = musicname;
      this.mymusic.musicauthor = musicauthor;
      this.mymusic.status = status;
      this.mymusic.release_date = release_date;
      this.mymusic.comment = comment;
    },
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
#app table {
  margin-top: 80px;
  /* margin: auto; */
}

label {
  font-size: 3ex;
  padding: 5px 0 0 0;
}
</style>
