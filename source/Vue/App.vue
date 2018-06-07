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
          <bsection 
            v-for="section in sections" 
            :key="section.id" 
            v-bind:value=section
          ></bsection>
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
    },
    data: () => ({})
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

.options-title
  width: 100%
  text-align: center
  padding: 5%

.options-list
  width: 100%
  padding: 0 5%
  list-style-type: none

.options-button
  margin-top: 30px

</style>
