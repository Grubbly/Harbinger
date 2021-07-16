<template>
  <div class='d-flex justify-center'>
    <v-btn @click="goToImport">
        Import Wallet From Mnemonic
    </v-btn>
  </div>
</template>

<script>
export default {
    name: 'ImportWalletFromMnemonicBtn',
    methods: {
        goToImport() {
            this.$router.push({ name: 'TheImportWalletForm' });
        }
    }
}
</script>

<style>

</style>