<template>
  <div class="overflow">
    <div class="studentAdd">
      <p>作品名：<input type="text" v-model="editWork.name"></p>
      <p>作　者：
        <select v-model="editWork.user._id">
          <option v-for="user in users" :value="user._id">
            {{user.name}}
          </option>
        </select>
      </p>
      <div class="upload-field">
        <span>图　片：</span>
        <div>
          <vue-clip :options="{url: '/api/upload'}"
                    :on-complete="onComplete"
                    :on-added-file="onAddedFile">
            <template slot="clip-uploader-action">
              <span class="dz-message">点击上传作品</span>
            </template>
          </vue-clip>
          <div class="img-list">
            <div class="img-list-item" v-for="(file,index) in files">
              <img :src="file.dataUrl"/>
              <a class="btn-del" @click="onRemoveFile(file,index)">删除</a>
            </div>
          </div>
        </div>
      </div>
      <p>日　期：<input type="date" v-model="editWork.createdAt"></p>
      <p class="btnGroup">
        <button @click="submit">提交</button>
        <button @click="cancel">取消</button>
      </p>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    props: ['work'],
    data() {
      console.log({...this.work});
      return {
        editWork: {...this.work},
        files: [],
        users: [],
      }
    },
    created() {
      Axios.get('/api/users')
        .then(res => this.users = res.data.users)
        .catch(err => console.log(err))
    },
    methods: {
      onAddedFile(file) {
        this.files.push(file);
      },
      onComplete(file, status, xhr) {
        //添加图片地址到file
        const json = JSON.parse(xhr.response);
        if (json.success) {
          file.addAttribute('id', json.id);
        }
      },
      onRemoveFile({customAttributes: {id}}, index) {
        this.files.splice(index, 1);
        Axios
          .delete(`/api/removeFile/${id}`)
          .then(console.log)
          .catch(console.error);
      },
      submit() {
        //处理files，将每一项id字段拼接为字符串
        this.editWork.img = this.files.map(f => f.customAttributes.id).join(',')
        this.$emit('submit', this.editWork)
      },
      cancel() {
        this.$emit('cancel')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .studentAdd {
    background-color: #fff;
    padding: 10px 20px 20px;
    margin: 20px auto;
  }

  @media screen and (max-device-width: 768px) {
    .studentAdd {
      width: 80%;
    }
  }

  @media screen and (min-device-width: 768px) {
    .studentAdd {
      width: 400px;
    }
  }

  .btnGroup {
    text-align: center;
    margin: 0;
  }

  input {
    width: 80%;
    height: 25px;
  }

  select {
    width: 81%;
    height: 30px;
  }

  .upload-field {
    display: flex;

  }

  .dz-message {
    text-decoration: underline;
    color: orangered;
    cursor: pointer;
  }

  .img-list {
    display: flex;
  }

  .img-list-item {
    width: 60px;
    height: 60px;
    position: relative;
    border: 1px solid #DDD;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-list-item > img {
    max-width: 100%;
    max-height: 100%;
  }

  .img-list-item > .btn-del {
    position: absolute;
    right: 0;
    top: 0;
    background-color: black;
    color: #FFF;
    cursor: pointer;
  }
</style>
