<template>
  <div>
    <el-calendar v-model="value">
      <template
        slot="dateCell"
        slot-scope="{ data}"
      >
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}

        </p></template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      value: new Date()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
