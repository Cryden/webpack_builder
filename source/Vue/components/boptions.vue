<template>
  <div class="b-options">
    <li
      v-for = "(section, index) in sections"
      :key = index
    >
      <v-checkbox
        :label = section.title
        :hide-details = true
        :value = section.check
        v-model = section.check
        @click = 'updateCheck(index, section.check)'
      ></v-checkbox>
    </li>
  </div>
</template>

<script>
export default {
  name: 'b-options',
  computed: {
    sections() {
      return this.$store.state.sections
    },
  },
  methods: {
    updateCheck (index, check) {
      this.$store.commit({
        type: 'checkSections', 
        index: index, 
        check: check
      })
    }
  }
}
</script>
