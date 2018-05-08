<template>
  <work-form :work="work"
             @submit="submit"
             @cancel="cancel">
  </work-form>
</template>

<script>
  import Axios from 'axios';
  import moment from 'moment';
  import WorkForm from './WorkForm';

  export default {
    data() {
      return {
        work: {
          name: '',
          img: '',
          user: {_id: ''},
          createdAt: moment().format('YYYY-MM-DD'),
        },
      }
    },
    beforeRouteEnter(to,from,next){
      next(ctx=>{
        if(to.params){
          ctx.work.user._id = to.params._id;
        }
      });
    },
    components: {WorkForm},
    methods: {
      submit(work) {
        Axios.post('/api/works', work)
          .then(res => {
            if (res.data.success) {
              this.$router.push({name: 'work'});
            } else {
              alert('保存失败，请重试！');
            }
          })
      },
      cancel() {
        this.$router.push({name: 'work'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
