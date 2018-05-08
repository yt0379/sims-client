<template>
  <div class="overflow">
    <div class="studentAdd">
      <p>名称：<input type="text" v-model="s.name"></p>
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
    methods: {
      submit() {
        this.$emit('submit',this.s)
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
