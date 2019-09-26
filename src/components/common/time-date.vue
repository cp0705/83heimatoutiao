<template>
  <div class="date">
    <div class="hour" :style="hourStyle"></div>
    <div class="min" :style="minStyle"></div>
    <div class="second" :style="secondStyle"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      min: 60,
      second: 60
    }
  },
  methods: {
    upDate () {
      let currentDate = new Date()
      this.hour = currentDate.getHours()
      this.min = currentDate.getMinutes()
      this.second = currentDate.getSeconds()
    }
  },
  computed: {
    hourStyle () {
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      let rowDeg = 30 * hour + this.min / 60 * 30
      return { transform: `rotate(${rowDeg}deg)` }
    },
    minStyle () {
      let rowDeg = this.min * 6 + this.second / 60 * 6
      return { transform: `rotate(${rowDeg}deg)` }
    },
    secondStyle () {
      let rowDeg = this.second * 6
      return { transform: `rotate(${rowDeg}deg)` }
    }
  },
  created () {
    setInterval(this.upDate, 1000)
  }
}
</script>

<style lang="less" scoped>
.date {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  background: url("./../../assets/images/back.png");
  background-size: cover;
  .hour, .min, .second {
      position: absolute;
      bottom: 50%;
      transform-origin: 0% 100%;
    //   transition: all 1s linear;

  }
  .hour {
    width: 8px;
    height: 100px;
    background: url("./../../assets/images/hou.png");
  }
  .min {
    width: 6px;
    height: 120px;
    background: url("./../../assets/images/min.png");
  }
  .second {
    width: 4px;
    height: 160px;
    background: url("./../../assets/images/sec.png");
  }
}
</style>
