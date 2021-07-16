<template>
  <v-app v-if="!isFetching">
    <TheNavbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import TheNavbar from './components/TheNavbar';

export default {
  name: 'App',
  
  data() {
    return {
      isFetching: true
    }
  },

  components: {
    TheNavbar
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
