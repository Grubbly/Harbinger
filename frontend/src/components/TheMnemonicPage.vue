<template>
    <v-card style='width: 90vw; height: 85vh;' class="d-flex justify-center align-center">        
        <v-card-text>
            <v-row class="d-flex justify-center align-center">
                <v-card-title>Wallet Recovery Mnemonic</v-card-title>
            </v-row>

            <v-row class="d-flex justify-center align-center">
                <div>Make sure to write this mnemonic down and store it in a safe place!</div>
            </v-row>

            <v-row class="d-flex justify-center align-center mb-4">
                <div class="error--text">This is the only way to recover your wallet!</div>
            </v-row>

            <v-row>
                <v-col cols='2' v-for="word in this.mnemonicArray" :key="word">
                    <v-card class="error">
                        <v-card-text class="primary--text d-flex justify-center">
                            {{word}}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            
            <v-row class="d-flex justify-center align-center">
                <v-btn class="ma-5" @click="goHome()">Continue</v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'TheMnemonicPage',
    props: {
        mnemonicArray: []
    },
    data() {
        return {
            rows: 6,
            columns: 4
        }
    },
    mounted() {
        console.log(this.mnemonicArray)
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'TheLanding' })
        }
    }
}
</script>

<style>

</style>