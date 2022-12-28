<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
    <addDepartment :dialog-visible="showDialog" @closeDialog="closeDialog" />
  </el-row>
</template>
<script>
import { delDepartments } from '@/api/daparments'
import addDepartment from './add-department.vue'
// 导入组件
export default {
  name: 'TreeTools',
  components: {
    addDepartment
  },
  props: {
    treeNode: {
      type: [String, Object, Array],
      required: true
    },
    isRoot: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleCommand(type) {
      console.log('触发事件' + type)
      if (type === 'add') {
        this.showDialog = true
        console.log('1')
      } else if (type === 'edit') {
        console.log('2')
      } else {
        this.$confirm('确认删除此部门嘛', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃修改'
        }).then(() => {
          delDepartments(this.treeNode.id)
          //   调用自定义指令通知父组件更新值
          this.$emit('delDeparment')
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        console.log('3')
      }
    },
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>
<style>

</style>
