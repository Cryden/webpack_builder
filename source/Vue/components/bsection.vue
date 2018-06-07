<template>
  <div class="b-section">
    <div
      v-for = "(section, index) in sections" 
      :key = index
    >
      <v-card class="section" v-if="section.check">
        <v-card-title class="headline section-title">
          <v-icon :class="section.color + '--text'" >{{ section.icon }}</v-icon>
          <div class="section-header">{{ section.title }}</div>
        </v-card-title>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <bcard :cards = section.cards :section = index></bcard>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import bcard from './bcard.vue'

export default {
  name: 'b-section',
  components: { 
    bcard 
  },
  data: () => ({}),
  props: [],
  computed: {
    sections() {
      return this.$store.state.sections
    },
  }
}
</script>

