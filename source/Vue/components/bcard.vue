<template>
  <div class="bcard">
    <ul
      v-for = "(card, index) in cards" 
      :key = index 
    >
      <li class="b-card">
        <img class="b-card__logo" :src=card.src />
        <v-checkbox
          :hide-details = true
          :label = card.title
          v-model = card.check
          :value = card.check
          @click = 'updateCheck(index, card.check)'
        ></v-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bcard',
  props: [ 'section', 'cards' ],
  methods: {
    updateCheck (card, check) {
      this.$store.commit({
        type: 'checkCards', 
        section: this.$props.section, 
        card: card, 
        check: check
      })
    }
  }

}
</script>

<style lang="sass" scoped>
.bcard
  display: flex
  flex-direction: row
.b-card 
  margin: 10px
  padding: 10px
  display: flex
  align-items: center
  flex-direction: column
  width: 120px
  &__logo
    width: 60px
    margin: 20px
</style>