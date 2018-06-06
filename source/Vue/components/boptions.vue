<template>
  <div>
    <li>
      <v-checkbox
        :label = state.title
        :hide-details = true
        @click = "updateMessage(index, checkValue)"
        :value = checkValue
        v-model = checkValue
      ></v-checkbox>
    </li>
  </div>
</template>

<script>
export default {
  name: 'boptions',
  props: [ 'state', 'index' ],
  data: () => (
    {
      checkValue: false
    }
  ),
  computed: {
    checkValue: function () {
      return true
    }
  },
  methods: {
    updateMessage (e, check) {
      console.log(e)
      this.$store.commit('checkSections', e, check)
    }
  }
}
</script>
