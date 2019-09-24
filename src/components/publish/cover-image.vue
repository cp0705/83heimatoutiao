<template>
  <div class="cover-img">
      <div class="cover-item" v-for="(item,i) in images" :key="i">
          <img :src=" item ? item : defaultImg " alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('./../../assets/images/pic_bg.png')
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
        border: 1px solid #ccc;
        padding: 10px;
    }
}
</style>
