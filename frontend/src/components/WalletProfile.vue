<template>
    <v-container class="d-flex justify-center" style="height: 90vh;">
        <v-row>
            <v-col cols='12'>
                <v-card class="fill-height" elevation='2'>
                    <v-card-title>{{this.walletName}}</v-card-title>
                    <v-card-text>{{this.wallet.address}}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols='4' v-for="col in 9" :key="-col">
                <v-card class="fill-height error">stuff</v-card>
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

            if(wallet === undefined) {
                this.$router.push({ name: 'Home' });
            }

            return wallet;
        }
    }
}
</script>