<template>
    <v-container class="custom-container-size d-flex justify-center align-center">
      <v-row v-if="!showMnemonic">
          <v-col cols='6' offset='3' class="d-flex justify-center align-center">
              <v-text-field
                v-model="walletName"
                label="Wallet Name"
                filled
                :rules='walletNameRules'
             ></v-text-field>
          </v-col>
          <v-col cols='12' class="d-flex justify-center align-center">
            <v-btn @click="createNewWallet">Create</v-btn>
          </v-col>
      </v-row>

      <v-row v-else class="d-flex justify-center align-center">
        <TheMnemonicPage :mnemonicArray="this.mnemonicArray"/>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import TheMnemonicPage from './TheMnemonicPage.vue';

export default {
    name: 'TheCreateNewWalletForm',
    data() {
        return {
            walletName: '',
            walletNameRules: [ 
                v => /^[\S;&\n]+$/.test(v)
            ],
            showMnemonic: false,
            mnemonic: ''
        }
    },

    components: {
        TheMnemonicPage
    },

    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        },
        mnemonicArray() {
            return this.mnemonic.split(' ');
        }
    },

    methods: {
        createNewWallet() {
            const createWalletBody = {
                walletName: this.walletName,
                flags: []
            };

            axios.post(this.backendUrl + '/akash/keys', createWalletBody)
                .then((res) => {
                    this.mnemonic = res.data.mnemonic;
                    this.showMnemonic = true;

                    axios.get(this.backendUrl + '/akash/keys').then((res) => {
                        this.$store.state.wallets = res.data;
                    });
                })
        }
    }
}
</script>

<style>

</style>