<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="DialogVisible">取 消</el-button>
      <el-button type="primary" @click="DialogVisible">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'AddDeparment',
  props: {
    dialogVisible: {
      type: [Boolean],
      required: true
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog')
    },
    DialogVisible() {
      console.log('2')
      this.$emit('closeDialog')
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
