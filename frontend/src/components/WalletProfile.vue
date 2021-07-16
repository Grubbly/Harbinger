<template>
    <v-container class="d-flex justify-center" style="height: 90vh;">
        <v-row>
            <v-col>
                <v-card elevation='2'>
                    <v-card-title>{{this.walletName}}</v-card-title>
                    <v-card-text>{{this.wallet.address}}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'WalletProfile',
    data() {
        return {
            wallet: Object,
        }
    },
    mounted() {
        this.wallet = this.getWalletByName(this.walletName);
    },
    computed: {
        walletName() {
            return this.$route.params.walletName
        }
    },
    methods: {
        getWalletByName(walletName) {
            const wallet = this.$store.getters.getWalletByName(walletName);
            return wallet;
        }
    }
}
</script>