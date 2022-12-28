<template>
  <div class="dashboard-container">
    <el-card class="tree-card">
      <!-- 我们需要封装公共的组件以便后面我们需要更更好的去维护 -->
      <!-- 在我们的正常逻辑中最上级没有添加部门和编辑部门所以我们需要删除他 -->
      <treeToolsVue :tree-node="company" :is-root="true" />
      <el-tree
        default-expand-all
        :data="deparment"
        :props="defaultProps"
      >
        <!-- 我们需要封装公共的组件以便后面我们需要更更好的去维护 -->
        <treeToolsVue slot-scope="{data}" :tree-node="data" @delDeparment="getDeparments" />
      </el-tree>
    </el-card>
    <button @click="testData">测试数据</button>
  </div>

</template>
<script>
import treeToolsVue from './component/tree-tools.vue'
import { getDeparments } from '@/api/daparments'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: {
    treeToolsVue
  },
  data() {
    return {
      company: {
        name: '科顿科技有限公司',
        manager: '负责人'
      },
      deparment: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDeparments()
  },
  mounted() {
  },
  methods: {
    async testData() {
      console.log('test success')
      const res = await getDeparments()
      console.log(res)
    },
    async getDeparments() {
      const res = await getDeparments()
      console.log(res, '获取组织结构数据成功')
      this.deparment = tranListToTreeData(res.depts, '')
      console.log(this.deparment)
    }
  }

}
</script>
<style >
    .tree-card {
    padding: 30px  140px;
    font-size:14px;
    }
</style>
