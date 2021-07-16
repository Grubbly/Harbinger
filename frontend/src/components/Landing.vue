<template>
  <v-container>
    <WalletCardGrid class='mt-5' />
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
