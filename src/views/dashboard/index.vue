<template>
  <div class="app-container">
    <el-dialog
      v-if="editProjectVisible"
      :visible="editProjectVisible"
      title="编辑工程"
      width="30%"
      destroy-on-close
      :show-close="false"
    >
      <el-form :model="form">
        <el-form-item label="工程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editProjectVisible = false">取 消</el-button>
          <el-button type="primary" @click="editProject">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-if="createProjectVisible"
      :visible="createProjectVisible"
      title="创建工程"
      width="30%"
      :show-close="false"
      destroy-on-close
    >
      <el-form :model="form">
        <el-form-item label="工程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createProjectVisible = false">取 消</el-button>
          <el-button type="primary" @click="createProject">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button type="primary" plain @click="handleCreateProject">新建工程</el-button>
      </el-col>
      <el-col :span="8" :offset="10">
        <el-input
          v-model="project_name"
          placeholder="名称查询"
          prefix-icon="el-icon-search"
          clearable
          autosize
          @change="handleQueryProject"
        />
      </el-col>
    </el-row>

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
          <el-button type="text" @click="handleClickRow(scope.$index, scope.row)">{{
            scope.row.projectName
          }}
          </el-button>
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
            @click="handleEditProject(scope.$index, scope.row)"
          >edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteProject(scope.$index, scope.row)"
          >delete
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="total"
      :page-size="pageSize"
      :current-page="page"
      layout="total, prev, pager, next"
      hide-on-single-page
      @prev-click="handlePrePage"
      @next-click="handleNextPage"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getProject, editProject, createProject, deleteProject } from '@/api/table'
import router from '@/router/index.js'
import { getUserID } from '@/utils/auth'

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
      size: 200,
      editProjectVisible: false,
      createProjectVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      pageSize: 10,
      project_name: '',
      formLabelWidth: '120px',
      form: {
        name: ''
      },
      rowPointer: null
    }
  },
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
        data['name'] = this.project_name
      }
      getProject(
        data
      ).then(response => {
        this.list = response['list']
        this.listLoading = false
        this.total = response['total']
      })
    },
    handleEditProject(index, row) {
      this.rowPointer = row
      this.editProjectVisible = true
    },
    handleDeleteProject(index, row) {
      this.$confirm('此操作将永久删除该工程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProject({ projectID: row['projectBaseID'] })
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    handleClickRow(index, row) {
      router.push({ path: '/project/index', query: { projectID: row['projectBaseID'] }})
    },
    handleCreateProject() {
      this.createProjectVisible = true
    },
    createProject() {
      createProject({
        name: this.form.name,
        groupID: this.$store.state.user.activate_role['groupBaseID'],
        createBy: getUserID() })
        .then(r => {
          this.createProjectVisible = false
          this.fetchData()
        })
    },
    editProject() {
      editProject({
        name: this.form.name,
        projectID: this.rowPointer['projectBaseID']
      }).then(r => {
        this.editProjectVisible = false
        this.fetchData()
      })
    },
    handlePrePage() {
      this.page -= 1
      this.fetchData()
    },
    handleNextPage() {
      this.page += 1
      this.fetchData()
    },
    handleQueryProject() {
      this.page = 1
      this.fetchData()
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
