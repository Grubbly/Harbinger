<template>
    <v-app-bar
      app
      color='error'
      dark
    >
      <h1 class='cursor-pointer' @click='goHome'>Harbinger</h1>
    </v-app-bar>
</template>

<script>
export default {
    name: 'TheNavbar',
    methods: {
        goHome() {
            // Not to be confused with this.$route
            this.$router.push({ name: 'TheLanding' });
        },
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>