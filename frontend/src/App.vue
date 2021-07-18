<template>
  <!-- TODO: REMOVE true here!  -->
  <!-- Only doing this because im on an airplane :( -->
  <v-app v-if="true || !isFetching">
    <TheNavbar />
    <v-main class="anchor">
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
