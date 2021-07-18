<template>
  <v-card>
      <v-card-title>Certificate</v-card-title>
      <!-- TODO: needs field validation -->
      <v-text-field
            v-model="feeInUAKT"
            label="Fee (uakt)"
            filled
        ></v-text-field>
      <v-btn @click="createCertificate()">Create Certiciate</v-btn>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            feeInUAKT: 5000
        }
    },
    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        }
    },
    methods: {
        createCertificate() {
            const createCertificateBody = {
                akashChainId: this.$store.state.AKASH_CHAIN_ID,
                akashKeyringBackend: this.$store.state.AKASH_KEYRING_BACKEND,
                akashKeyName: this.$store.state.AKASH_KEY_NAME,
                akashNode: this.$store.state.AKASH_NODE,
                feeInUAKT: this.feeInUAKT
            }

            axios.post(this.backendUrl + '/akash/certs', createCertificateBody);
        }
    }
}
</script>

<style>

</style>