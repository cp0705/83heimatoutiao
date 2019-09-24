<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
      ref="myForm"
      :model="formData"
      :rules="rules"
      style="margin-left:60px"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input style="width:300px" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:300px" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:300px" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input style="width:300px" disabled v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload action :show-file-list="false" :http-request="editImg">
      <img class="header-img" :src="formData.photo?formData.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from './../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('./../../assets/images/avatar.jpg'),
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名长度1-7个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    editImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        console.log(res)
        this.formData.photo = res.data.photo
        eventBus.$emit('updateUserInfo')
        this.loading = false
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            eventBus.$emit('updateUserInfo')
            this.$message.success('保存成功')
          })
        }
      })
    },
    getUserInfo () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  left: 800px;
  //   right: 400px;
  top: 150px;
}
</style>
