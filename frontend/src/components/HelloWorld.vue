<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>Yo</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-btn>asdf</v-btn></v-col>
    </v-row>
    <v-textarea :value="ps_output"></v-textarea>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ps_output: '<Powershell Output Here!>'
    }),

    methods: {
    
    }
  }
</script>
