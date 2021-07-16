<template>
    <v-container class="d-flex justify-center" style="height: 90vh;">
        <v-row>
            <v-col>
                <v-card elevation='2'>
                    <v-card-title>{{$route.params.walletName}}</v-card-title>
                    <v-card-text><h1>0 AKT</h1></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WalletProfile',
    // props: {
    //     wallet
    // }
}
</script>