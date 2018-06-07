<template>
  <div class="b-options-list">
    <p class="title options-title">I Used in Project</p>
      <ul class="options-list">
        <boptions></boptions>
        <div class="text-xs-center options-button" >
          <v-btn color="success">Generate</v-btn>
        </div>
      </ul>
  </div>
</template>

<script>
import boptions from './boptions.vue'

export default {
  components: {
    boptions
  }
}
</script>

<style>

</style>
