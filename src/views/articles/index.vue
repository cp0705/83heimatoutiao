<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select
          @change="changeCondition"
          v-model="formData.channel_id"
          filterable
          placeholder="请选择"
        >
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
          @change="changeCondition"
          v-model="formData.date"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-item" v-for="(item,i) in list" :key="i">
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag :type="item.status|statusType" class="status">{{item.status|statusText}}</el-tag>
          <span class="data">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span @click="editArticle(item.id.toString())">
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="delArticle(item.id.toString())">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-pagination
      @current-change="changePage"
      :current-page="page.currentPage"
      align="center"
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :total="page.total"
    ></el-pagination>
  </el-card>
</template>
119
<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        date: []
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      value: '',
      channels: [],
      list: [],
      defaultImg: require('./../../assets/images/avatar.jpg')
    }
  },
  created () {
    this.getData()
    this.getChannels()
  },
  methods: {
    editArticle (id) {
      this.$router.push(`/home/publish/${id}`)
    },
    async delArticle (id) {
      await this.$confirm('您确定删除该文章吗？')
      await this.$axios({
        url: `/articles/${id}`,
        method: 'delete'
      })
      this.$message.success('删除成功')
      this.queryArticles()
    },
    queryArticles () {
      let params = {
        channel_id: this.formData.channel_id,
        status: this.formData.status === 5 ? null : this.formData.status,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getData(params)
    },
    changePage (current) {
      this.page.currentPage = current
      this.queryArticles()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.queryArticles()
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    async getData (params) {
      let res = await this.$axios({
        url: '/articles',
        params
      })
      this.list = res.data.results
      this.page.total = res.data.total_count
    }
  },
  filters: {
    // 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .data {
        color: #999;
        font-size: 12px;
      }
      .title {
        font-size: 16px;
      }
      .status {
        padding: 0;
        width: 70px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 6px;
      cursor: pointer;
    }
  }
}
</style>
