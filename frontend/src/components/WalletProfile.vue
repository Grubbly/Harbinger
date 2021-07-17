<template>
    <v-container :v-if='!isFetching' class="d-flex justify-center" style="height: 90vh;">
        <v-row>
            <!-- Title -->
            <v-col cols='12'>
                <v-card class="fill-height" elevation='2'>
                    <v-card-title>{{this.walletName}}</v-card-title>
                    <v-card-text>{{this.wallet.address}}</v-card-text>
                </v-card>
            </v-col>

            <!-- Environment Variables -->
            <v-col cols='4'>
                <v-card>
                    <v-list subheader two-line>
                        <v-list-item v-for="(item, key, index) in this.environmentVariables" :key="index">
                            <v-list-item-content>
                                <v-list-item-title class="primary--text">{{key}}</v-list-item-title>
                                <v-list-item-subtitle>{{item}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
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
            isFetching: true,
            wallet: Object,
        }
    },
    mounted() {
        this.wallet = this.getWalletByName(this.walletName);

        // Deployment Setup

        // AKASH_KEY_NAME=walletName
        this.$store.state.AKASH_KEY_NAME = this.walletName;
        console.log('Wallet Name', this.$store.state.AKASH_KEY_NAME);

        Promise.all([
            // AKASH_VERSION="$(curl -s "$AKASH_NET/version.txt")"
            axios.get(this.$store.state.AKASH_NET + '/version.txt')
                .then((res) => {
                    this.$store.state.AKASH_VERSION = res.data;
                    console.log('VERSION', this.$store.state.AKASH_VERSION);
                }),

            // AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")"
            axios.get(this.$store.state.AKASH_NET + '/chain-id.txt')
                .then((res) => {
                    this.$store.state.AKASH_CHAIN_ID = res.data;
                    console.log('CHAIN ID', this.$store.state.AKASH_CHAIN_ID);
                }),

            // AKASH_NODE="$(curl -s "$AKASH_NET/rpc-nodes.txt" | shuf -n 1)"
            axios.get(this.$store.state.AKASH_NET + '/rpc-nodes.txt')
                .then((res) => {
                    const nodes = res.data.split('\n');
                    const randomNode = nodes[Math.floor(Math.random()*nodes.length)];
                    this.$store.state.AKASH_NODE = randomNode;
                    console.log('NODE', this.$store.state.AKASH_NODE);
                })
        ])
        .then(() => {
            // All get requests have finished at this point
            this.isFetching = false;
            console.log("Done fetching");
        })

        
    },
    computed: {
        walletName() {
            return this.$route.params.walletName
        },
        environmentVariables() {
            return {
                AKASH_KEY_NAME: this.$store.state.AKASH_KEY_NAME,
                AKASH_NET: this.$store.state.AKASH_NET,
                AKASH_VERSION: this.$store.state.AKASH_VERSION,
                AKASH_CHAIN_ID: this.$store.state.AKASH_CHAIN_ID,
                AKASH_NODE: this.$store.state.AKASH_NODE
            }
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