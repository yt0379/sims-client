<template>
  <div>
    <toolbar>
      <button @click="add">新增班级</button>
    </toolbar>
    <table>
      <tr class="th">
        <th width="10%">序号</th>
        <th>名称</th>
        <th class="operation">操作</th>
      </tr>
      <tr v-for="(s,i) in classes">
        <td>{{i+1}}</td>
        <td>{{s.name}}</td>
        <td>
          <button @click="update(s)">更新</button>
          <button @click="remove(s)">删除</button>
        </td>
      </tr>
    </table>
    <router-view></router-view>
  </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    data() {
      return {
        classes: []
      }
    },
    created() {
      this.getClassList()
    },
    beforeRouteUpdate(to,from,next){
      this.getClassList();
      next();
    },
    methods: {
      getClassList() {
        Axios
          .get('/api/classes')
          .then(res => {
            this.classes = res.data.classes;
          })
          .catch(err => console.log(err))
      },
      add() {
        this.$router.push({name: 'classAdd'})
      },
      update(s){
        this.$router.push({name: 'classUpdate',params:s})
      },
      remove(s){
        if(confirm('确定删除'))
          Axios
            .delete('/api/classes/'+s._id)
            .then(res => this.getClassList())
            .catch(err => console.log(err))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .operation {
    width: 100px;
  }

  .score {
    width: 35px;
    text-align: center;
  }
</style>
