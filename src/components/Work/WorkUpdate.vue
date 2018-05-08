<template>
  <work-form :work="$route.params"
             @submit="submit"
             @cancel="cancel">
  </work-form>
</template>

<script>
  import Axios from 'axios';
  import WorkForm from './WorkForm';

  export default {
    components: {WorkForm},
    methods: {
      submit(s) {
        Axios.put('/api/works', s)
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
