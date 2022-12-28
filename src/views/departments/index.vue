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
        <treeToolsVue slot-scope="{data}" :tree-node="data" />
      </el-tree>
    </el-card>
  </div>

</template>
<script>
import treeToolsVue from './component/tree-tools.vue'
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
      deparment: [{
        name: '总裁办',
        manager: '王巡东',
        children: [{
          name: '董事会',
          manager: '曹操1'
        }]
      }, { name: '行政部',
        manager: '曹操2',
        children: [{
          name: '人事部',
          manager: '曹操3'
        }]
      },
      { name: '行政部', manager: '刘备' },
      { name: '人事部', manager: '孙权' }],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
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
<style >
    .tree-card {
    padding: 30px  140px;
    font-size:14px;
    }
</style>
