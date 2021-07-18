<template>
    <v-container :v-if='!isFetching' class="d-flex justify-center" style="height: 90vh;">
        <v-row>
            <!-- Title -->
            <v-col cols='12'>
                <v-card class="error fill-height" elevation='2'>
                    <v-card-title class="primary--text">{{this.walletName}}</v-card-title>
                    <v-card-text class="primary--text">{{this.balance}} AKT</v-card-text>
                    <v-card-text class="primary--text">{{this.wallet.address}}</v-card-text>
                </v-card>
            </v-col>

            <!-- Environment Variables -->
            <v-col cols='6'>
                <v-card>
                    <v-list subheader two-line class="error">
                        <v-list-item v-for="(item, key, index) in this.environmentVariables" :key="index">
                            <v-list-item-content>
                                <v-list-item-title class="primary--text">{{key}}</v-list-item-title>
                                <v-list-item-subtitle class="primary--text">{{item}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <!-- Certificate -->
            <v-col cols='6'>
                <CertificateCard />
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import CertificateCard from './CertificateCard.vue';

export default {
    name: 'WalletProfile',
    data() {
        return {
            isFetching: true,
            wallet: Object,
            balance: 0
        }
    },
    components: {
        CertificateCard
    },
    mounted() {
        this.wallet = this.getWalletByName(this.walletName);
        // Deployment Setup

        // AKASH_KEY_NAME=walletName
        this.$store.state.AKASH_KEY_NAME = this.walletName;
        console.log('Wallet Name', this.$store.state.AKASH_KEY_NAME);

        // AKASH_ACCOUNT_ADDRESS="$(akash keys show $AKASH_KEY_NAME -a)"
        this.$store.state.AKASH_ACCOUNT_ADDRESS = this.wallet.address;
        console.log('Wallet Address', this.$store.state.AKASH_ACCOUNT_ADDRESS);

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
                .then(async (res) => {
                    const nodes = res.data.split('\n');
                    const randomNode = nodes[Math.floor(Math.random()*nodes.length)];
                    this.$store.state.AKASH_NODE = randomNode;
                    console.log('NODE', this.$store.state.AKASH_NODE);
                }),
        ])
        .then(async () => {
            // All get requests have finished at this point
            this.isFetching = false;
            this.balance = await this.getWalletBalanceByAddress(this.wallet.address)
        })

        
    },
    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        },
        walletName() {
            return this.$route.params.walletName
        },
        environmentVariables() {
            return {
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
        },
        // TODO: needs testing
        getWalletBalanceByAddress(walletAddress) {
            const params = {
                address: walletAddress,
                node: this.$store.state.AKASH_NODE
            }
            console.log(params );
            return axios.get(this.backendUrl + '/akash/balance', {params})
                .then((res) => {
                    if(res.data.balances.amount !== undefined) {
                        return res.data.balances.amount;
                    } else {
                       return 0;
                    }
                });
        }
    }
}
</script>