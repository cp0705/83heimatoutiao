<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" width="300" label="标题"></el-table-column>
      <el-table-column
        :formatter="stautsFormatter"
        prop="comment_status"
        align="center"
        label="评论状态"
      ></el-table-column>
      <el-table-column prop="total_comment_count" align="center" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" align="center" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            size="small"
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
            type="text"
            @click="closeOrOpen(obj.row)"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @current-change="changePage"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        background
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10// 每页条数
      },
      loading: false
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    changePage (current) {
      this.page.currentPage = current
      this.getComment()
    },
    async closeOrOpen (row) {
      // row当前行数据
      let str = row.comment_status ? '关闭' : '打开'
      try {
        await this.$confirm(`您确定要${str}评论吗？`, '提示')
        await this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        })
        this.getComment()
      } catch (error) {
        console.log(error)
      }
    },
    stautsFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    async getComment () {
      this.loading = true
      let res = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      this.list = res.data.results
      this.page.total = res.data.total_count
      this.loading = false
    }
  }
}
</script>

<style>
</style>
