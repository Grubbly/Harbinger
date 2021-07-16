<template>
  <v-card>
      <v-card-title>{{ this.name }}</v-card-title>
      <v-card-text>{{ this.address }}</v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'WalletCard',
    props: {
        name: String,
        address: String
    }
}
</script>