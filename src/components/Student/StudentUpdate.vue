<template>
  <student-form :s="$route.params"
                @submit="submit"
                @cancel="cancel">
  </student-form>
</template>

<script>
  import Axios from 'axios';
  import StudentForm from './StudentForm';

  export default {
    components:{StudentForm},
    methods: {
      submit(s) {
        Axios.put('/api/user', s)
          .then(res => {
            if (res.data.success) {
              this.$router.push({name:'student'});
            } else {
              alert('保存失败，请重试！');
            }
          })
      },
      cancel() {
        this.$router.push({name:'student'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
