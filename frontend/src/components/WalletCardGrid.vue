<template>
  <v-row>
      <v-col cols='3' v-for="wallet in wallets" :key="wallet.address">
          <WalletCard @onDeleteClicked="onWalletCardDelete" :name="wallet.name" :address="wallet.address" />
      </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import WalletCard from './WalletCard.vue'

export default {
    name: 'WalletCardGrid',

    components: {
        WalletCard
    },

    data: () => ({
      wallets: [],
    }),

    mounted() {
        // Get all the wallets on this device
        axios.get(`http://localhost:${this.$store.state.backendPort}/akash/keys`).then((res) => {
            this.wallets = res.data;
        });
    },

    methods: {
        onWalletCardDelete(address) {
            console.log(address);
        }
    }
}
</script>

<style>

</style>