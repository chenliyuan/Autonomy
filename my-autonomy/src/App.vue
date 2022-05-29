<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$store.state.number);
    // this.$store.commit('setNumber');
    console.log(this.$store.state.number);

    console.log(this.$store.getters);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}


html,body{
 
 height: 100%;
 
}

</style>
