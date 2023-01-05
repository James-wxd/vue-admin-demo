<template>
  <div class="page-tools">
    <!-- <h2>员工管理</h2> -->
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12">
          <div v-if="showBefore" class="before">
            <i class="el-icon-info" />
            <!-- 定义前面得插槽 -->
            <slot name="before" />
          </div>
        </el-col>
        <el-row type="flex" class="row-bg" justify="end">
          <el-col>
            <div v-if="showBefore">
              <!-- 定义后面得插槽 -->
              <slot name="after" />
            </div>
          </el-col>
        </el-row>
      </el-row>
    </el-card>

  </div>
</template>
<script>
export default {
  name: 'GlobalTools',
  props: {
    showBefore: {
      type: [Boolean],
      default: false
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
  }
}
</script>
  <style  lang='scss' >
    .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
  </style>

