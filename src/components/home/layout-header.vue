<template>
  <el-row class="layout-header" align="middle" type="flex" justify="space-between">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" align="right">
      <img class="head-img" src="./../../assets/images/avatar.jpg" alt />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          user
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style  lang="less" scoped>
.layout-header {
    height: 50px;
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
        margin-right:4px;
    }
}
</style>
