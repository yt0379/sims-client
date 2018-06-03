<template>
  <div class="overflow">
    <div class="box">
      <h3 class="title">
        {{$route.params.name}}的上课记录
        <span class="close" @click="cancel">×</span>
      </h3>
      <ul class="list" v-if="data.length>0">
        <li v-for="his in data">
          {{his.content}}
          <span>{{createdAt(his.createdAt)}}</span>
        </li>
      </ul>
      <p v-else>暂无上课记录</p>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  import moment from 'moment';

  export default {
    name:'ScoreHistory',
    data(){
      return {
        data:[]
      }
    },
    created(){
      Axios.get('/api/scoreHistory/'+this.$route.params._id)
        .then(res=>{
          if(res.data.success) {
              this.data = res.data.data;
          }else{
            alert('查询上课记录失败，请重试')
          }
        })
        .catch(err=>alert('查询上课记录失败，请重试'))
    },
    methods: {
      cancel() {
        this.$router.push({name:'student'});
      },
      createdAt(timeStr){
        return moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    position: absolute;
    top: 50px;
    left: 20px;
    right: 20px;
    background-color: white;
  }
  @media screen and (min-device-width: 768px){
    .box {
      width: 600px;
      left:50%;
      margin-left:-300px;
    }
  }
  .box p{
    padding: 10px;
  }
  .title{
    background-color: dodgerblue;
    color:white;
    margin:0;
    padding:10px;
  }
  .title>span{
    cursor: pointer;
  }
  .close{
    float: right;
    padding: 0 0 10px 10px;
  }
  .list{
    margin:0;
    padding:20px;
    min-height: 200px;
  }
  .list>li{
    margin-left: 16px;
  }
</style>
