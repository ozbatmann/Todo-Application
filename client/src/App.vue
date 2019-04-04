<template>
 <v-app>
   <template>
     <v-fade-transition mode="out-in">
       <router-view></router-view>
     </v-fade-transition>
       <vue-snotify></vue-snotify>
   </template>
 </v-app>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
    overflow: hidden !important;
}

main.app-content {
    position: absolute;
    height: 100%;
    width: 100%;
}

.v-content__wrap {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}
</style>
