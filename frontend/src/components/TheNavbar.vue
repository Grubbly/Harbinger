<template>
    <v-app-bar
      app
      color='primary'
      dark
    >
      <h1 class='cursor-pointer' @click='goHome'>Wow look at this cool app title</h1>
    </v-app-bar>
</template>

<script>
export default {
    name: 'TheNavbar',
    methods: {
        goHome() {
            // Not to be confused with this.$route
            this.$router.push({ name: 'Landing' })
        },
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>