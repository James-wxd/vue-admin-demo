<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <i style="color:#fff; font-size: 20px; display: inline-block;" class="el-icon-full-screen" @click="changeScreen" />
    <!-- <button>123</button> -->
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    //   改变全屏
    changeScreen() {
      if (!screenfull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      screenfull.toggle()
    }
  }
}
</script>

  <style lang="scss">

  </style>
