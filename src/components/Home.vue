<template>
  <div class="home">
    <div id="mask" class="overflow" @click="hideNav"></div>
    <ul id="nav">
      <li>
        <router-link to="/student">学生信息</router-link>
      </li>
      <li>
        <router-link to="/class">班级信息</router-link>
      </li>
      <li>
        <router-link to="/work">作品</router-link>
      </li>
    </ul>
    <img id="icon" src="../assets/icon.svg" @click="showNav">

    <div id="content"><router-view></router-view></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods:{
      showNav(){
        document.getElementById('nav').style.left = '0%';
        document.getElementById('mask').style.opacity = 1;
        document.getElementById('mask').style.display = 'block';
      },
      hideNav(){
        document.getElementById('nav').style.left = '-100%';
        document.getElementById('mask').style.opacity = 0;
        setTimeout(()=>{
          document.getElementById('mask').style.display = 'none';
        },200);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    height: 100%;
    display: flex;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  a {
    color: darkorange;
    text-decoration: none;
    display: block;
    text-align: center;
    padding:6px 0;
  }

  .router-link-active{
    background-color: silver;
  }

  #nav {
    width: 150px;
    height: 100%;
    background-color: #f2f2f2;
    padding-top: 10px;
    transition: left 300ms;
  }
  #icon{
    position: absolute;
    width: 75px;
    height: 75px;
    right: -16px;
    top: -12px;
    z-index: 9;
  }
  #mask{
    display: none;
    opacity: 0;
    transition: opacity 200ms;
  }
  @media screen and (max-device-width:768px){
    #nav {
      position: absolute;
      z-index:100;
      left: -100%;
    }
  }
  @media screen and (min-device-width:768px){
    #nav {
      position: static;
    }
    #icon {
      display: none;
    }
  }
  #content{
    flex:1;
  }


</style>
