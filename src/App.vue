<template>
<div id="app">
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #324057;
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  text-align: center;
}

</style>

<script>
export default {
  data(){
    return{
      name:"aaa",
      password:'123'
    }
  }
}
</script>
