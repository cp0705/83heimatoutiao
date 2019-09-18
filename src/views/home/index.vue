<template>
<!-- 定义一个大容器 -->
  <el-container>
      <!-- 左侧导航 -->
      <el-aside>
          <layout-aside></layout-aside>
      </el-aside>
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
import latoutAside from './../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': latoutAside
  }
}
</script>
