<template>
  <v-container class="d-flex justify-center align-center" style="width: 70vw; height: 90vh;">
    <v-row>
      <v-col cols='12'>
        <ImportWalletFromMnemonicBtn />
      </v-col>
      <v-col cols='12'>
        <TheWalletCardGrid class='ma-5'/>    
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TheWalletCardGrid from './TheWalletCardGrid';
  import ImportWalletFromMnemonicBtn from './ImportWalletFromMnemonicBtn';

  export default {
    name: 'TheLanding',
    components: {
      TheWalletCardGrid,
      ImportWalletFromMnemonicBtn
    }
  }
</script>
