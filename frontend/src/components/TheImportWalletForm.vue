<template>
    <v-container class="custom-container-size d-flex justify-center align-center">
      <v-row>
          <v-col cols='6' offset='3' class="d-flex justify-center align-center">
              <v-text-field
                v-model="walletName"
                label="Wallet Name"
                filled
                :rules='walletNameRules'
             ></v-text-field>
          </v-col>
          <v-col cols='12'>
            <v-textarea
                v-model="mnemonicWords"
                auto-grow
                filled
                color="primary"
                label="Mnemonic (space delimited)"
                rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols='12' class="d-flex justify-center align-center">
            <v-btn @click="submitMnemonic">Import</v-btn>
          </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TheImportWalletForm',
    data() {
        return {
            walletName: '',
            mnemonicWords: '',
            walletNameRules: [ 
                v => /^[\S;&\n]+$/.test(v)
            ]
        }
    },

    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        }
    },

    methods: {
        submitMnemonic() {
            const importWalletBody = {
                walletName: this.walletName,
                mnemonic: this.mnemonicWords
            };

            axios.post(this.backendUrl + '/akash/import', importWalletBody)
                .then(() => {
                    axios.get(this.backendUrl + '/akash/keys').then((res) => {
                        this.$store.state.wallets = res.data;
                        this.$router.push({ name: 'TheLanding' })
                    })
                })
        }
    }
}
</script>

<style>

</style>