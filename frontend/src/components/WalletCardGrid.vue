<template>
  <v-row class="d-flex justify-center">
      <v-col cols='6' v-for="wallet in this.wallets" :key="wallet.address">
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

    mounted() {
        // Get all the wallets on this device
        axios.get(this.backendUrl + '/akash/keys').then((res) => {
            this.$store.state.wallets = res.data;
        });
    },

    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        },
        wallets() {
            return this.$store.state.wallets
        }
    },

    methods: {
        // Once the wallet has been deleted from the backend, the corresponding
        // WalletCard will $emit an event handled by this function which removes
        // it visually from the frontend.
        onWalletCardDelete(address) {
            this.$store.state.wallets = this.wallets.filter(wallet => wallet.address !== address);
        }
    }
}
</script>

<style>

</style>