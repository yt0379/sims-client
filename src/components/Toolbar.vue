<template>
  <div class="toolbar"
       :style="{backgroundColor:bgc}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:['bgc'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toolbar{
    background-color: #ff7800;
    height: 2.6rem;
    box-sizing: border-box;
    padding: 10px;
  }
</style>
