<template>
  <v-card @mouseenter="selectShow = true" @mouseleave="selectShow = false">
    <v-card-title>{{ this.name }}</v-card-title>
    <v-card-text>{{ this.address }}</v-card-text>
    
    <router-link :to="{ name: 'WalletProfile', params: {walletName: this.name}}">
        <v-fab-transition>
            <v-btn
                v-show="selectShow"
                color="secondary"
                fab
                dark
                small
                absolute
                left
                bottom
            >
                <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
        </v-fab-transition>
    </router-link>


    <v-card-actions class="info">
        <v-spacer></v-spacer>
        <v-btn @click="onDeleteClicked" small icon>
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WalletCard',
    
    data() {
        return {
            selectShow: false,
        }
    },

    props: {
        name: String,
        address: String,
    },

    computed: {
        backendUrl() {
            return this.$store.getters.backendUrl;
        }
    },

    methods: {
        // When a delete occurs, this WalletCard will send an async DELETE request to
        // /akash/keys/:walletName. When a response is received, it will $emit an event
        // to WalletCardGrid to remove its entry from the local array of all wallets.
        onDeleteClicked() {
            axios.delete(this.backendUrl + '/akash/keys/' + this.name).then(() => {
                this.$emit('onDeleteClicked', this.address);
            })
        },
        test() {
            console.log("hi");
        }
    },
}
</script>