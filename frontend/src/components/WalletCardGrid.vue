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
        axios.get(this.backendUrl + '/akash/keys').then((res) => {
            this.wallets = res.data;
        });
    },

    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        }
    },

    methods: {
        // Once the wallet has been deleted from the backend, the corresponding
        // WalletCard will $emit an event handled by this function which removes
        // it visually from the frontend.
        onWalletCardDelete(address) {
            this.wallets = this.wallets.filter(wallet => wallet.address !== address);
        }
    }
}
</script>

<style>

</style>