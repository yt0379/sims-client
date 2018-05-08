<template>
  <class-form :s="$route.params"
              @submit="submit"
              @cancel="cancel">
  </class-form>
</template>

<script>
  import Axios from 'axios';
  import ClassForm from './ClassForm';

  export default {
    components: {ClassForm},
    methods: {
      submit(s) {
        Axios.put('/api/classes', s)
          .then(res => {
            if (res.data.success) {
              this.$router.push({name: 'class'});
            } else {
              alert('保存失败，请重试！');
            }
          })
      },
      cancel() {
        this.$router.push({name: 'class'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
