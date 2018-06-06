<template>
  <v-app>
    <v-navigation-drawer app>
      <div class="logo">
        <img src="./../images/logo.png" alt="FROND"/>
        <p>webpack based front-end builder</p>        
      </div>

      <p class="title options-title">I Used in Project</p>
      <ul class="options-list">
        <boptions
          v-for="(section, index) in sections"
          :key="section.id"
          :state = section
          :index = index
        ></boptions>
        <div class="text-xs-center options-button" >
          <v-btn color="success">Generate</v-btn>
        </div>
      </ul>
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
  import boptions from './components/boptions.vue'

  export default {
    components: { 
      bsection,
      boptions,
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
