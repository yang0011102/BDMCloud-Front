<template>
  <div class="app-container">
    <el-container>
      <el-button type="primary" @click="handleCreateProject">新建工程</el-button>

      <el-input
        v-model="project_name"
        placeholder="名称查询"
        prefix-icon="el-icon-search"
        clearable
        @change="fetchData"
      />
    </el-container>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="project name" @cell-click="handleClickRow(scope.$index, scope.row)">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClickRow(scope.$index, scope.row)">{{ scope.row.projectName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="create by" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="modify time" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.modifyTime }}
        </template>
      </el-table-column>
      <el-table-column label="operation">
        <template #default="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >delete
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="pageSize"
      :current-page="page"
      layout="total, sizes, prev, pager, next"
      hide-on-single-page
      @prev-click="fetchData"
      @next-click="fetchData"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getProject } from '@/api/table'
import router from '@/router/index.js'
export default {
  name: 'Dashboard',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 0,
      pageSize: 10,
      project_name: '',
      formLabelWidth: '120px'
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'activate_role',
  //     'roles'
  //   ])
  // },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        groupID: this.$store.state.user.activate_role['groupBaseID']
      }
      if (this.project_name !== '') {
        data['projectName'] = this.project_name
      }
      getProject(
        data
      ).then(response => {
        this.list = response.list
        this.listLoading = false
        this.total = response.total
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClickRow(index, row) {
      router.push({ path: '/project/index', query: { projectID: '1407908313596383234' }})
    },
    handleDialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleDialogFormConfirm() {
      this.dialogVisible = false
      console.log('确认表单')
    },
    handleCreateProject() {
      router.push({ path: '/project/index', query: { projectID: '!23' }})
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
