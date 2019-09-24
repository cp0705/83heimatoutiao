<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form style="margin-left:60px" label-width="100px">
          <el-form-item label="用户名">
              <el-input style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input style="width:300px"></el-input>
          </el-form-item>
          <el-form-item >
              <el-button type="primary">保存信息</el-button>
          </el-form-item>
      </el-form>
      <img class="header-img" src="./../../assets/images/avatar.jpg" alt="">
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    right: 400px;
    top: 150px;
}

</style>
