<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>Harbinger</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='3' v-for="wallet in wallets" :key="wallet.address">
        <v-card>
          <v-card-title> {{wallet.name}} </v-card-title>
          <v-card-text> {{wallet.address}} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Landing',

    data: () => ({
      wallets: [],

    }),

    mounted() {
      // Get all the wallets on this device
      axios.get(`http://localhost:${this.$store.state.backendPort}/akash/keys`).then((res) => {
        this.wallets = res.data;
      });
    }
  }
</script>
