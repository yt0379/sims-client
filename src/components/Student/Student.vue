<template>
  <div>
    <toolbar>
      <button @click="add">新增学员</button>
    </toolbar>
    <div>
      <table>
        <tr class="th">
          <th width="25%">姓名</th>
          <th width="10%">年龄</th>
          <th width="30%">课时</th>
          <th width="35%">操作</th>
        </tr>
      </table>

      <div v-for="(students,clazz) in groupedStudents">
        <h3>{{clazz}}</h3>
        <table v-for="s in students">
          <tr>
            <td width="25%">{{s.name}}</td>
            <td width="10%">{{s.age}}</td>
            <td width="30%">
              <button @click="scoreMinus(s)">-</button>
              <input type="text" class="score"
                     v-model="s.score"
                     @keyup.enter="scoreChange(s,`上课次数更新为${s.score}次`)">
              <button @click="scoreAdd(s)">+</button>
            </td>
            <td width="35%">
              <button @click="showWorks(s)">作品</button>
              <button @click="showHistory(s)">上课记录</button>
              <button @click="update(s)">更新</button>
              <button @click="remove(s)">删除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Axios from 'axios';
  import _ from 'lodash';

  export default {
    data() {
      return {
        students: []
      }
    },
    created() {
      this.getUserList()
    },
    beforeRouteUpdate(to, from, next) {
      this.getUserList();
      next();
    },
    computed: {
      groupedStudents() {
        return _.groupBy(this.students, 'clazz.name');
      }
    },
    methods: {
      getUserList() {
        Axios
          .get('/api/userList')
          .then(res => {
            this.students = res.data.students;
          })
          .catch(err => console.log(err))
      },
      scoreChange({_id,score},msg){//更新上课记录
        Axios
          .post('/api/setScore', {_id, score, msg})
          .then(res => {
            if (!res.data.success) {
              //更新失败，刷新数据
              this.getUserList();
              alert('操作失败，请重试！')
            }else{
              //更新成功
              this.$toast('操作成功，'+msg)
            }
          })
          .catch(err => console.log(err));
      },
      scoreAdd(s) {
        this.$set(s, 'score', s.score + 1);
        this.scoreChange(s,'续费1次');
      },
      scoreMinus(s) {
        this.$set(s, 'score', s.score - 1);
        this.scoreChange(s,'消课1次');
      },
      add() {
        this.$router.push({name: 'studentAdd'})
      },
      update(s) {
        this.$router.push({name: 'studentUpdate', params: s})
      },
      remove(s) {
        if (confirm('确定删除'))
          Axios
            .delete('/api/user/' + s._id)
            .then(res => this.getUserList())
            .catch(err => console.log(err))
      },
      showWorks(s) {
        this.$router.push({name: 'work', params: s})
      },
      showHistory(s){
        this.$router.push({name: 'history', params: s})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 2px;
    padding: 4px;
    background-color: #dfdfdf;
  }

  .score {
    width: 35px;
    text-align: center;
  }
</style>
