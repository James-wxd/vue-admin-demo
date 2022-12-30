<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  > <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <!-- <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form> -->
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name" placeholder="1-50个字符">
        <el-input v-model="ruleForm.name" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code" placeholder="1-50个字符">
        <el-input v-model="ruleForm.code" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- <el-input v-model.number="ruleForm.deparmentMangager" /> -->
        <el-select v-model="ruleForm.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <!-- <el-input v-model.number="ruleForm.deparmentIntroduce" style="width:80%" /> -->
        <el-input v-model="ruleForm.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>
<script>
import { getDeparments, addDepartments, getDepartDetail, updateDepartments } from '@/api/daparments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDeparment',
  props: {
    dialogVisible: {
      type: [Boolean],
      required: true
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  //   res.depts
  data() {
    var checkdeparment = async(rule, value, callback) => {
      const res = await getDeparments()
      let isRepeat = false
      if (this.ruleForm.id) {
        isRepeat = res.depts.filter(item => item.id !== this.ruleForm.id && item.pid === this.treeNode.id).some(item => item.name === value)
      } else {
        isRepeat = res.depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDeparments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式  因为编辑模式下 不能算自己
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }

    return {
      peoples: [],
      ruleForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkdeparment, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }]

      }
    }
  },
  computed: {
    title() {
      return this.ruleForm.id ? '编辑部门' : '新增部门'
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
    testdata() {
      console.log(this.$attrs)
    },
    DialogVisible() {
      console.log('2')
      this.$emit('closeDialog')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 这个就是编辑部门
          if (this.ruleForm.id) {
            this.$message.success('数据修改成功')
            await updateDepartments(this.ruleForm)
          }
          console.log(this.ruleForm)
          this.$message.success('提交成功')
          await addDepartments({ ...this.ruleForm, pid: this.treeNode.id }) // 调用新增接口 添加父部门的id
          this.$emit('addDepart', false)
          this.$emit('closeDialog')
        } else {
          this.$message.Error('提交失败')
          return false
        }
      })
    },
    async  getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
      console.log(this.peoples, '获取员工的简单列表success')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('closeDialog')
      setTimeout(() => {
        this.ruleForm = {
          name: '',
          code: '',
          manager: '',
          introduce: ''
        }
      }, 500)
    },
    async getDepartDetail(node) {
      const res = await getDepartDetail(node)
      this.ruleForm = res
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
