<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>Wow look at this cool app title</h1>
    </v-app-bar>

    <v-main>
      <Landing/>
    </v-main>
  </v-app>
</template>

<script>
import Landing from './components/Landing.vue';

export default {
  name: 'App',

  components: {
    Landing,
  },
};
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
