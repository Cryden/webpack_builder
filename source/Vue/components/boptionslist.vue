<template>
  <div class="b-options-list">
    <p class="title options-title">I Used in Project</p>
      <ul class="options-list">
        <boptions></boptions>
        <div class="text-xs-center options-button" >
          <v-btn color="success" @click="sendFile">Generate</v-btn>
        </div>
      </ul>
  </div>
</template>

<script>
import boptions from './boptions.vue'
import axios from 'axios'

export default {
  components: {
    boptions
  },
  methods: {
    sendFile() {
      axios({
        method: 'post',
        url: '/generate',
        data: this.$store.state.sections
      }).then(function(response) {
        console.log(response.data)
      })
    }
  }
}
</script>

<style lang="sass">
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
