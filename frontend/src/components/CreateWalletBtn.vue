<template>
  <div class='d-flex justify-center'>
    <v-btn @click="goToCreateNewWallet">
        Create New Wallet
    </v-btn>
  </div>
</template>

<script>
export default {
    name: 'CreateWalletBtn',
    methods: {
        goToCreateNewWallet() {
            this.$router.push({ name: 'TheCreateNewWalletForm' });
        }
    }
}
</script>

<style>

</style>