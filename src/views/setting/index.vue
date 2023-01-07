<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRole"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="tableData">
              <el-table-column label="序号" width="120" prop="id" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="handleAllot(scope.row.id)">分配权限</el-button>
                  <el-button size="small" type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="total,prev,pager,next"
                :total="page.total"
                small
                :page-size="page.pagesize"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px" :model="from">
              <el-form-item label="公司名称">
                <el-input v-model="from.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="from.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="from.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="from.remark" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 编辑弹出框 -->
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK('roleForm')">确定</el-button>
            <el-button size="small" @click="btnCancel('roleForm')">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <!-- <button @click="testData">test</button> -->
    <div class="buttom">
      <p class="'buttom-font'">
        copyright@ 科顿科技版权所有
      </p>
    </div>
    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
      <button @click="testElTree">test el-tree</button>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, getRoleDetail, addRole, delRole, updateRole, assignPrem } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      from: {
        name: '杭州科顿有限公司',
        companyAddress: '浙江省杭州市滨江区长河街道月明路1040号3层30418室',
        mailbox: 'bd@kedcn',
        remark: '技术开发、技术服务、技术咨询、成果转让：智能产品、计算机软硬件、电子商务技术、游戏软件；服务：第二类增值电信业务中的信息服务业务、利用信息网络经营游戏产品（含网络游戏虚拟货币发行）；销售：计算机软硬件及辅助设备、日用百货、包装材料、电子产品、工艺礼品、皮革制品、服装鞋帽、玩具、照相器材、体育用品、家具、家用电器、装饰材料、汽摩配件、宠物用品、化妆品（除分装）、通信设备、眼镜（除角膜接触镜）、珠宝首饰、文具用品、箱包、花卉、针织纺品。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
      },
      roleForm: {

      },
      showDialog: false,
      showPermDialog: false,
      rules: {
        name: [
          { required: true, message: '名字不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        description: [{ required: true, message: '活动描述不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      permData: [
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId: null,
      selectCheck: null
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    title() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }

  },
  created() {
    this.getRole()
  },
  mounted() {
  },
  methods: {
    testElTree() {
      console.log('1')
      console.log(this.$refs.permTree.getCheckedKeys())
    },
    async testData() {
      const res = await getRoleList(
        { page: this.page.page, pagesize: this.page.pagesize })
      console.log(res)
      console.log(this.companyId, '测试数据是否存在')
      // const res = await getCompanyInfo(this.companyId)
      // console.log(res, 'company')
    },
    async getRole() {
      this.loading = true
      const { rows, total } = await getRoleList(
        { page: this.page.page, pagesize: this.page.pagesize })
      // console.log(res)
      this.tableData = rows
      this.page.total = total
      this.loading = false
    },
    async handleCurrentChange(value) {
      console.log(value)
      this.loading = true
      this.page.page = value
      const { rows } = await getRoleList(
        { page: this.page.page, pagesize: this.page.pagesize })
      this.tableData = rows
      this.loading = false
    },
    async handleAllot(id) {
      console.log(id, '获取权限点')
      const res = tranListToTreeData(await getPermissionList(), '0')
      this.permData = res
      this.roleId = id
      // 获取用户的个人详情 里面存在这个用户已经存在的权限点
      const { permIds } = await getRoleDetail(id)
      console.log(permIds, '已经存在的权限点')
      this.selectCheck = permIds
      this.showPermDialog = true
    },
    async  btnPermOK() {
      await assignPrem({
        permIds: this.$refs.permTree.getCheckedKeys(),
        id: this.roleId
      })
      this.$message.success('分配角色成功')
      this.showPermDialog = false
    },
    btnPermCancel() {
      this.selectCheck = null
      this.showPermDialog = false
    },
    async handleDelete(id) {
      this.loading = true
      await delRole(id)
      // 重新获取数据
      const { rows } = await getRoleList(
        { page: this.page.page, pagesize: this.page.pagesize })
      this.$message.success('删除角色成功')
      this.tableData = rows
      this.loading = false
    },
    async  handleEdit(id) {
      console.log(id)
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    btnCancel(formName) {
      setTimeout(() => {
        this.roleForm = {
          name: '',
          description: ''
        }
      }, 500)
      this.$refs[formName].resetFields()
      this.showDialog = false
    },
    async  btnOK(formName) {
      console.log(formName)
      if (this.roleForm.id) {
        console.log(1)
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            console.log('2')
            // 这里处理编辑工作的代码
            // this.showDialog = false
            await updateRole(this.roleForm)
            // 重新获取数据
            const { rows } = await getRoleList(
              { page: this.page.page, pagesize: this.page.pagesize })
            this.tableData = rows
            this.showDialog = false
          } else {
            this.$message.error('出现了意料之外的错误，请重新尝试')
          }
        }
        )
      } else {
        console.log('addrole')
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            // console.log('2')
            this.loading = true
            // this.showDialog = false
            const res = await addRole({
              name: this.roleForm.name,
              region: this.roleForm.description
            })
            // 这里存在一个页面闪动问题我们应该在请求数据成功之后就可以关闭dialog 页面了
            this.showDialog = false
            // 重新获取用户解决列表数据
            const { rows } = await getRoleList(
              { page: this.page.page, pagesize: this.page.pagesize })
            console.log(res)
            this.tableData = rows
            this.loading = false
            this.$message.success('新增角色成功')
          } else {
            console.log('error')
          }
        }
        )
      }

      // 如果没有id 就是编辑业务 负责就是新增业务
    },
    addRole() {
      this.showDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .dashboard-container {
    background-color: #f0f2f5
  }
  .buttom{
    text-align: center;
    color: #848587;
    font-size: 14px;
    font-family:monospace;
    position: relative;
    top:13px
  }
  .app-main{
    background-color: #f0f2f5
  }
</style>
