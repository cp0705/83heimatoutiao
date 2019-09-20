<template>
  <el-row class="layout-header" align="middle" type="flex" justify="space-between">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" align="right">
      <img class="head-img" :src=" userInfo.photo ? userInfo.photo : defaultImg " alt />
      <!-- 下拉菜单  -->
      <el-dropdown trigger="click" @command="commandClick">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('./../../assets/images/avatar.jpg') // 转换base64
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    commandClick (command) {
      if (command === 'account') {
        // 账号信息
        this.$router.push('/home/account')
      } else if (command === 'git') {
        // git地址
        window.location.href = 'https://github.com/cp0705/83heimatoutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      }).then(res => {
        this.userInfo = res.data.data
      })
    }
  }
}
</script>

<style  lang="less" scoped>
.layout-header {
  height: 60px;
  .el-icon-s-unfold {
    font-size: 22px;
  }
  .title {
    vertical-align: top;
    margin-left: 4px;
  }
  .head-img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    border-radius: 50%;
    margin-right: 4px;
  }
}
</style>
