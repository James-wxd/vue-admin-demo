<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- <h2>员工管理</h2> -->
      <!-- 这里我们将放入需要的全局注册组件 -->
      <globalTools :show-before="showComponent=true">
        <template v-slot:before> <!--两种写法 一种是 v-slot:before 一种是 slot="before"-->
          <span>12222条记录</span>
        </template>
        <template slot="after">
          <el-button type="warning" round size="mini" icon="el-icon-document-checked" @click="importRoute">导入</el-button>
          <el-button type="success" round size="mini" icon="el-icon-share" @click="exportData">导出</el-button>
          <el-button type="primary" round size="mini" icon="el-icon-folder-add" @click="showDialog = true">新增员工</el-button>
        </template>
      </globalTools>
      <el-card>
        <el-table border :data="tableData">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="fromatterLabel" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{row}">
              {{ row.timeOfEntry|formatDate }}
              <!-- <button @click="ss(row)">ceshi</button> -->
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="inServiceStatus" :formatter="fromtterStatus" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="routerDetails(row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEemployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="page.total" @current-change="handleCurrentChange" />
        </el-row>
      </el-card>
      <button @click="testData">测试</button>
    </div>
    <AddDemployee :show-dialog.sync="showDialog" @btnCancel="showDialog=false" />
  </div>

</template>
<script>
import { Enum } from '@/api/constant/formatter'
import { getEmployeeList, delEmployee } from '@/api/employees'
import AddDemployee from './component/add-employee.vue'
import { formatDate } from '@/filters/index'
import EmployeeEnum from '@/api/constant/employees'
export default {
  name: 'Employees',
  components: {
    AddDemployee
  },
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        size: 10,
        total: null
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {
  },
  methods: {
    async testData() {
      console.log('123')
      // const res = await getEmployeeList({
      //   page: this.page.page,
      //   size: this.page.size
      // })
      // console.log(res)
      // console.log(this.tableData)
      console.log(EmployeeEnum)
    },
    async  getEmployeeList() {
      // console.log('123')
      this.loading = true
      const { total, rows } = await getEmployeeList({
        page: this.page.page,
        size: this.page.size
      })
      // console.log()
      this.tableData = rows
      this.page.total = total
      this.loading = false
    },
    handleCurrentChange(value) {
      console.log(value)
      this.page.page = value
      this.getEmployeeList({
        page: this.page.page,
        size: this.page.size
      })
    },
    fromatterLabel(row, column, cellValue, index) {
      // console.log(row.formOfEmployment)
      // console.log(s1)
      // eslint-disable-next-line eqeqeq
      return cellValue !== Enum.id ? '社招' : '未知'
    },
    fromtterStatus(row, column, cellValue, index) {
      // console.log(cellValue, 'status')
      // eslint-disable-next-line eqeqeq
      return cellValue == Enum.Status ? '可用' : '离线'
    },
    ss(row) {
      console.log(row)
    },
    async delEemployee(id) {
      console.log(id)
      this.loading = true
      await delEmployee(id)
      this.getEmployeeList()

      this.loading = false
    },
    importRoute() {
      this.$router.push('/import?type=user')
    },
    // 导出excel数据
    exportData() {
      //  做操作
      // 表头对应关系
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.size })
        const data = this.formatJson(headers, rows)

        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx'

        })
        // 获取所有的数据

      //   excel.export_json_to_excel({
      //     header: ['姓名', '薪资'],
      //     data: [['张三', 12000], ['李四', 5000]],
      //     filename: '员工薪资表',
      //     autoWidth: true,
      //     bookType: 'csv'
      //   })
      })
    },
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            var en = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
    },
    routerDetails(id) {
      this.$router.push(`/details/${id}`)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
