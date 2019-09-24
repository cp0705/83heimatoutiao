<template>
  <div class="cover-img">
    <div @click="openDia(i)" class="cover-item" v-for="(item,i) in images" :key="i">
      <img :src=" item ? item : defaultImg " alt />
    </div>
    <!-- 弹层组件 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
      <select-img @selectOneImg="receiveImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      selectIndex: -1,
      dialogVisible: false,
      defaultImg: require('./../../assets/images/pic_bg.png')
    }
  },
  methods: {
    receiveImg (img) {
      this.$emit('selectOneImg', img, this.selectIndex)
      this.dialogVisible = false
    },
    openDia (index) {
      this.dialogVisible = true
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.cover-img {
  display: flex;
  margin: 10px 0;
  margin-left: 100px;
  .cover-item {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
