 <template>
    <div class="b-card">
      <img class="b-card__logo" :src=value.src />
        <v-checkbox
          :label = value.title
          v-model = "htmlTemplates"
          :value = value.check
        ></v-checkbox>
    </div>
</template>

<script>
export default {
  name: 'bcard',
  props: [ 'value',],
  data: () => ({
    htmlTemplates: false,
  })
}
</script>

<style lang="sass" scoped>
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