<template>
  <v-container class="d-flex justify-center align-center" style="height: 90vh;">
    <WalletCardGrid class='mt-5' style="max-width: 50%;"/>
  </v-container>
</template>

<script>
  import WalletCardGrid from './WalletCardGrid.vue';
  export default {
    name: 'Landing',
    components: {
      WalletCardGrid
    }
  }
</script>
