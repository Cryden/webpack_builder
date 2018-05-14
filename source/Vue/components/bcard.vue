 <template>
    <div class="b-card">
      <img class="b-card-logo" :src=value.src />
      <p>{{ value.title }}</p>
        <v-checkbox
          label="Checkbox"
          v-model="htmlTemplates"
          value = value.check
        ></v-checkbox>
    </div>
</template>

<script>
export default {
  name: 'bcard',
  props: [ 'value',],
  data: () => ({
    htmlTemplates: [''],
  })
}
</script>

<style>

</style>
