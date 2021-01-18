<template>
  <div id="app">
    <HomePage />
    <!-- <CardTest :track="{artists:'Thelonius B', title: 'Lobby', cover: 'https://e-cdns-images.dzcdn.net/images/cover/b9e5e72b97f049e6d807838dee557231/1400x1400-000000-80-0-0.jpg'}"/> -->
  </div>
</template>

<script>
import HomePage from './components/HomePage'
// import CardTest from './components/CardTest'

export default {
  name: 'App',
  components: {
    HomePage,
    // CardTest
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px; */
}
</style>
