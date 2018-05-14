<template>
  <v-app>
    <v-navigation-drawer app>
      <v-toolbar class="white" flat>
        <v-toolbar-items class="text-lg-right">
          <img src="./../images/logo.png" alt="FROND" class="logo" />
        </v-toolbar-items>
      </v-toolbar>
    </v-navigation-drawer>
    <v-content>
    <v-layout column>
      <v-flex xs12>
        <div v-for="section in sections" :key="section.title">
          <v-card class="section">
            <v-card-title primary-title class="section-title">
              <v-icon>{{ section.icon }}</v-icon>
              <div class="section-header">{{ section.title }}</div>
            </v-card-title>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <bcard v-for="card in section.cards" 
                :key="card.title" 
                v-bind:value=card></bcard>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import bcard from './components/bcard.vue'

  export default {
    components: { 
      bcard 
    },
    data: () => ({
      sections: [
        { 
          title: 'Template Engine',
          icon: 'fab fa-html5',
          color: 'orange',
          cards: [
            { title: 'HTML5', src: 'images/html5-logo.png', check: false},
            { title: 'PUG', src: 'images/pug-logo.png', check: false},
          ] 
        },
        { 
          title: 'CSS preprocessors', 
          color: 'blue',
          icon: 'fab fa-css3',
          cards: [
            { title: 'CSS', src: 'images/css3-logo.png', check: false},
            { title: 'SASS', src: 'images/sass-logo.png', check: false},
            { title: 'LESS', src: 'images/less-logo.png', check: false},
          ] 
        }
      ]
    })
  }
</script>