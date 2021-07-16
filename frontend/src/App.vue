<template>
  <v-app v-if="!isFetching">
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
import axios from 'axios'

export default {
  name: 'App',

  data() {
    return {
      isFetching: true
    }
  },

  computed: {
    backendUrl() {
      return this.$store.getters.backendUrl;
    },
  },

  mounted() {
    // Get all the wallets on this device
    axios.get(this.backendUrl + '/akash/keys').then((res) => {
        this.$store.state.wallets = res.data;
        this.isFetching = false;
    });
  },
};
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
