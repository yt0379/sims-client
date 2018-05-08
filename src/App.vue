<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html,body,#app {
    margin: 0;
    height: 100%;
  }

  #app {
    font-family: 微软雅黑, 宋体, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  table{
    width: 100%;
    text-align: center;
  }
  table tr.th{
    background-color: #eaeaea;
  }
  table td{
    padding: 2px 4px;
  }
  tr:nth-child(odd){
    background-color: #f5f5f5;
  }
  .overflow{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index:10;
  }
</style>
