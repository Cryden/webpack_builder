<template>
  <v-app>
    <v-navigation-drawer app>
      <div class="logo">
        <img src="./../images/logo.png" alt="FROND"/>
        <p>webpack based front-end builder</p>        
      </div>
      <boptionslist></boptionslist>
    </v-navigation-drawer>
    <v-content>
      <v-layout column>
        <v-flex xs12>
          <bsection></bsection>
        </v-flex>
      </v-layout>
      <v-footer>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import bsection from './components/bsection.vue'
  import boptionslist from './components/boptionslist.vue'

  export default {
    components: { 
      bsection,
      boptionslist,
    },
    computed: {
      sections () {
        return this.$store.state.sections
      }
    }
  }
</script>

<style lang="sass">
.logo
  display: flex
  flex-direction: column
  align-items: center
  margin: 40px
  img 
    width: 140px
  p 
    margin-top: 10px
    font-size: 14px
</style>
