<template>
  <v-container class="custom-container-size d-flex justify-center align-center mt-5">
    <v-row>
      <v-col class='d-flex justify-center align-center' cols='12'>
        <h1>{LOGO}Harbinger</h1>
      </v-col>
      <v-col cols='12'>
        <TheWalletCardGrid class='ma-5'/>    
      </v-col>
      <v-col cols='12'>
        <CreateWalletBtn />
      </v-col>
      <v-col cols='12'>
        <ImportWalletFromMnemonicBtn />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TheWalletCardGrid from './TheWalletCardGrid';
  import ImportWalletFromMnemonicBtn from './ImportWalletFromMnemonicBtn';
  import CreateWalletBtn from './CreateWalletBtn.vue';

  export default {
    name: 'TheLanding',
    components: {
      TheWalletCardGrid,
      ImportWalletFromMnemonicBtn,
      CreateWalletBtn
    },
  }
</script>
