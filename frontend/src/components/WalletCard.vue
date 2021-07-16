<template>
  <v-card>
    <v-card-title>{{ this.name }}</v-card-title>
    <v-card-text>{{ this.address }}</v-card-text>
    
    <v-card-actions class="info">
        <v-spacer></v-spacer>
        <v-btn @click="onDeleteClicked" small icon>
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'WalletCard',
    props: {
        name: String,
        address: String
    },
    methods: {
        onDeleteClicked() {
            this.$emit('onDeleteClicked', this.address);
        }
    }
}
</script>