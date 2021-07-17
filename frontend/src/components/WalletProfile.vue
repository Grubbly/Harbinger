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
import axios from 'axios';

export default {
    name: 'WalletProfile',
    data() {
        return {
            wallet: Object,
        }
    },
    mounted() {
        this.wallet = this.getWalletByName(this.walletName);

        // Deployment Setup

        // AKASH_KEY_NAME=walletName
        this.$store.state.AKASH_KEY_NAME = this.walletName;
        console.log('Wallet Name', this.$store.state.AKASH_KEY_NAME);

        // AKASH_VERSION="$(curl -s "$AKASH_NET/version.txt")"
        axios.get(this.$store.state.AKASH_NET + '/version.txt')
            .then((res) => {
                this.$store.state.AKASH_VERSION = res.data;
                console.log('VERSION', this.$store.state.AKASH_VERSION);
            });

        // AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")"
        axios.get(this.$store.state.AKASH_NET + '/chain-id.txt')
            .then((res) => {
                this.$store.state.AKASH_CHAIN_ID = res.data;
                console.log('CHAIN ID', this.$store.state.AKASH_CHAIN_ID);
            });

        // AKASH_NODE="$(curl -s "$AKASH_NET/rpc-nodes.txt" | shuf -n 1)"
        axios.get(this.$store.state.AKASH_NET + '/rpc-nodes.txt')
            .then((res) => {
                const nodes = res.data.split('\n');
                const randomNode = nodes[Math.floor(Math.random()*nodes.length)];
                this.$store.state.AKASH_NODE = randomNode;
                console.log('NODE', this.$store.state.AKASH_NODE);
            })

        
    },
    computed: {
        walletName() {
            return this.$route.params.walletName
        },
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