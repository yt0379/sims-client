<template>
  <div>
    <toolbar>
      <button @click="add">新增作品</button>
    </toolbar>
    <div>
      <div v-for="(userWorks,userName) in groupedWorks">
        <h3>{{userName}} <button @click="add(userWorks[0].user)">新增作品</button></h3>
        <div class="works">
          <div v-for="w in userWorks" class="work">
            <img :src="'/assets/uploads/'+getPoster(w)">
            <div class="title">
              <p>{{w.name}}</p>
              <p>{{w.createdAt.substr(0,10)}}</p>
            </div>
          </div>
        </div>
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
        user: null,
        works: [],
      }
    },
    beforeRouteEnter(to, from, next) {
      getWorks(to.params._id || '',
        ({works}) => next(ctx => {
          ctx.user = to.params;
          ctx.works = works;
        }),
        () => next(from.path)
      )
    },
    beforeRouteUpdate(to, from, next){
      if(to.name == 'work'){
        getWorks(to.params._id || '',
          ({works}) => {
            this.user = to.params;
            this.works = works;
          },
          () => alert('保存错误，请重试')
        )
      }
      next();
    },
    computed: {
      groupedWorks() {
        return _.groupBy(this.works, 'user.name');
      }
    },
    methods: {
      add(user) {
        this.$router.push({name: 'workAdd', params: user || this.user})
      },
      update(w) {
        this.$router.push({name: 'workUpdate', params: w})
      },
      remove(id) {
        if (confirm('确定删除'))
          Axios
            .delete('/api/works/' + id)
            .then(res => {
              if (res.data.success)
                getWorks('', (res) => this.works = res.data.works)
              else
                alert('删除出错，请重试！')
            })
            .catch(err => alert('删除出错，请重试！'))
      },
      getPoster(w) {
        return w.img.split(',')[0];
      }
    }
  }

  function getWorks(user, success, fail) {
    Axios
      .get(`/api/getWorks?user=${user}`)
      .then(res => success(res.data))
      .catch(err => {
        alert('获取数据出错，请重试！')
        if (fail) fail();
      })
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

  .works {
    display: flex;
  }

  .work{
    position: relative;
  }

  .work img{
    width: 120px;
    float: left;
  }

  .title{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    color: #fff;
  }

  .title p{
    margin: 0;
    font-size: 14px;
  }
</style>
