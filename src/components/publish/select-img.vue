<template>
  <el-tabs>
    <el-tab-pane label="素材库">
      <div class="imgs-list">
        <el-card class="imgs-item" v-for="item in list" :key="item.id">
          <img @click="clickImg(item)" :src="item.url" alt />
        </el-card>
      </div>
      <el-pagination
        @current-change="changePage"
        :current-page="page.currentPage"
        align="center"
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload action :show-file-list="false" :http-request="uploadImg">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectOneImg', res.data.url)
      })
    },
    clickImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    changePage (current) {
      this.page.currentPage = current
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.imgs-list {
  display: flex;
  flex-wrap: wrap;
  .imgs-item {
    width: 120px;
    height: 100px;
    margin: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
