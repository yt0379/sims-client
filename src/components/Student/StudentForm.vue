<template>
  <div class="overflow">
    <div class="studentAdd">
      <p>姓名：<input type="text" v-model="student.name"></p>
      <p>年龄：<input type="number" v-model="student.age"></p>
      <p>电话：<input type="tel" v-model="student.tel"></p>
      <p>班级：<select v-model="student.clazz._id">
        <option v-for="c in classes" :value="c._id">
          {{c.name}}
        </option>
      </select>
      </p>
      <p>课时：<input type="number" v-model="student.score"></p>
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
    props:['s'],
    data() {
      return {
        student:this.s,
        classes:[]
      }
    },
    created(){
      Axios.get('/api/classes')
        .then(res=>this.classes=res.data.classes)
        .catch(err=>console.log(err))
    },
    methods: {
      submit() {
        this.$emit('submit',this.student)
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

  @media screen and (max-device-width: 768px){
    .studentAdd {
      width: 80%;
    }
  }
  @media screen and (min-device-width: 768px){
    .studentAdd {
      width: 400px;
    }
  }

  .btnGroup {
    text-align: center;
    margin: 0;
  }
  input{
    width: 80%;
    height: 25px;
  }
  select{
    width: 81%;
    height: 30px;
  }
</style>
