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
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },
};
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
