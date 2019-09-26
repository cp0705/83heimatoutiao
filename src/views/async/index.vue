<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">异步应用</template>
    </bread-crumb>
    <p>{{count}}</p>
    <el-button type="primary" @click="updataPromise">传统Promise更新数据</el-button>
    <el-button type="success" @click="updataAsync">async更新数据</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    async updataAsync () {
      this.count = await this.updateAxios()
    },
    updataPromise () {
      this.updateAxios().then(res => {
        this.count = res
      })
    },
    updateAxios () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(2)
        }, 2000)
      })
    }
  }
}
</script>

<style>

</style>
