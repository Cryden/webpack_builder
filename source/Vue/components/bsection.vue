<template>
  <v-card class="section" v-if="value.check">
    <v-card-title class="headline section-title">
      <v-icon :class="value.color + '--text'" >{{ value.icon }}</v-icon>
      <div class="section-header">{{ value.title }}</div>
    </v-card-title>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <bcard 
          v-for = "card in value.cards" 
          :key = "card.title" 
          v-bind:value = card
        ></bcard>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import bcard from './bcard.vue'

export default {
  name: 'b-section',
  components: { 
    bcard 
  },
  data: () => ({}),
  props: [ 'value',],
}
</script>

