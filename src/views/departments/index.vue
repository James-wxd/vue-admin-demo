<template>
  <div v-loading="loading" class="dashboard-container">
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
        <treeToolsVue slot-scope="{data}" :tree-node="data" @delDeparment="getDeparments" @addepart="addepart" @editDepts="editDepts" />
      </el-tree>
    </el-card>
    <!-- <button @click="testData">测试数据</button> -->
    <addDepartment ref="formdata" :dialog-visible="showDialog" :tree-node="node" v-bind="$attrs" @closeDialog="closeDialog" @addDepart="getDeparments" />
  </div>

</template>
<script>
import treeToolsVue from './component/tree-tools.vue'
import { getDeparments } from '@/api/daparments'
import { tranListToTreeData } from '@/utils/index'
import addDepartment from '@/views/departments/component/add-department.vue'
export default {
  name: 'Departments',
  components: {
    treeToolsVue,
    addDepartment
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
      },
      showDialog: false,
      node: null,
      formData: {},
      loading: false
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
      console.log(this.$refs.formdata)
    },
    async getDeparments() {
      this.loading = true
      const res = await getDeparments()
      console.log(res, '获取组织结构数据成功')
      this.deparment = tranListToTreeData(res.depts, '')
      console.log(this.deparment)
      this.loading = false
    },
    closeDialog() {
      this.showDialog = false
    },
    addepart(node) {
      console.log('2')
      this.showDialog = true
      this.node = node
      console.log(this.node)
    },
    async editDepts(node) {
      this.showDialog = true
      this.node = node // 赋值操作的节点
      this.$refs.formdata.getDepartDetail(node.id)
    }

  }

}
</script>
<style >
    .tree-card {
    padding: 30px  140px;
    font-size:14px;
    }
    .dashboard-container {
    background-color: #f0f2f5
  }
</style>
