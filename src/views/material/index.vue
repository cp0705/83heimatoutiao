<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload action='' :show-file-list='false' :http-request='upload' class='to-upload'>
        <el-button type="primary">图片上传</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <!-- 收藏/取消收藏 -->
              <i @click="collectOrCancel(item)" class="el-icon-star-on" :style="{color: item.is_collected ? 'red' : '#000'}"></i>
              <!-- 删除 -->
              <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-itemsc" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination @current-change="changePage" :current-page="page.currentPage" align="center" style="margin-top:20px" background layout="prev, pager, next" :total="page.total"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    collectOrCancel (item) {
      let str = item.is_collected ? '取消' : ''
      this.$confirm(`您确认${str}收藏该图片吗？`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(() => {
          this.getData()
          this.$message.success(`${str}收藏成功`)
        })
      })
    },
    delImg (id) {
      this.$confirm('你确定删除吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getData()
        })
      })
    },
    upload (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getData()
        this.$message.success('上传成功')
      })
    },
    changePage (current) {
      this.page.currentPage = current
      this.getData()
    },
    handleClick () {
      this.page.currentPage = 1
      this.getData()
    },
    getData () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName !== 'all',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  }
}
</script>

<style lang='less' scope>
.to-upload {
    position: absolute;
    right: 0;
    margin-right: 20px;
    margin-top: -10px;
    z-index: 9999;
}
.img-list {
  display: flex;
  flex-flow: wrap;
  .img-item, .img-itemsc {
    position: relative;
    height: 180px;
    width: 180px;
    margin: 30px;
    border-radius: 6px;
    .el-card__body {
      padding: 0;
      img {
        width: 100%;
        height: 150px;
      }
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 30px;
      width: 100%;
      background-color: #fff;
      i {
        font-size: 20px;
      }
    }
  }
  .img-itemsc {
      .el-card__body {
      padding: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
