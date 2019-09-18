<template>
<!-- 定义一个大容器 -->
  <el-container>
      <!-- 左侧导航 -->
      <el-aside>左侧内容</el-aside>
      <!-- 右侧大容器 -->
      <el-container>
          <!-- 右侧头部 -->
          <el-header>头部</el-header>
          <!-- 中部区域 -->
          <el-main>
              <!-- 二级路由 -->
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  components: {

  }
}
</script>
