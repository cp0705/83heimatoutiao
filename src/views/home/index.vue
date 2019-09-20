<template>
<!-- 定义一个大容器 -->
  <el-container>
      <!-- 左侧导航 -->
      <el-aside style="width: 200px;">
          <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
          <!-- 右侧头部 -->
          <el-header>
            <layout-header></layout-header>
          </el-header>
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
import latoutHeader from './../../components/home/layout-header'
export default {
  components: {
    'layout-aside': latoutAside,
    'layout-header': latoutHeader
  }
}
</script>
