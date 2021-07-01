<template>
  <div class="dashboard-container">
    <!--    文件目录-->
    <el-container>
      <el-header>
        <!--        <div class="dashboard-text">projectID: {{ this.$route.query.projectID }}</div>-->
        <!--        <div class="dashboard-text">groupID:{{ this.$store.state.user.activate_role['groupBaseID'] }}</div>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-table
          v-loading="folderLoading"
          :data="folderList"
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
          <el-table-column label="name">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClickFolderRow(scope.$index, scope.row)">{{
                scope.row.name
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
      </el-main>
    </el-container>
    <!--    文件列表-->
    <el-container>
      <el-table
        v-loading="fileLoading"
        :data="fileList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      />
      <el-pagination
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        layout="total, sizes, prev, pager, next"
        hide-on-single-page
      />
    </el-container>
  </div>
</template>

<script>
import { queryFileList, queryFolder } from '@/api/folder'

export default {
  name: 'Project',
  data() {
    return {
      folderLoading: true,
      folderList: null,
      folderTotal: 0,
      fileLoading: true,
      fileList: null,
      fileTotal: 0,
      total: 0,
      page: 0,
      pageSize: 10,
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  created() {
    this.fetchFolder()
  },
  methods: {
    goBack() {
      console.log('go back')
    },
    handleClickFolderRow(index, row) {
      console.log(index, row)
      this.fileLoading = false
    },
    handleNodeClick(data) {
      // 点击目录时获得该目录下的文件列表
      console.log(data)
      this.fileLoading = false
      const request_data = {
        page: this.page,
        pageSize: this.pageSize,
        folderID: data.folderID
      }
      queryFileList(request_data)
        .then(r => {
          console.log(r)
        })
    },
    fetchFolder() {
      this.folderLoading = true
      queryFolder({ projectID: this.$route.query.projectID })
        .then(r => {
          console.log(r)
          this.folderList = r['list']
          // this.folderLoading = false
        })
      this.folderLoading = false
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
