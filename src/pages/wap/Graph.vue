<template>
<div class="intro">
  <div class="intro-graph">
  <div class="intro-graph__yaxis">
    <div
      v-for="(monthItem, index) in yieldRate.length"
      class="intro-graph__yaxis-item"
      :style="{
        'width': `${yaxisItemWidth + (index === (yieldRate.length - 1) ? 0 : 2)}px`
      }"
    >
      <div class="intro-graph__yaxis-item__blank" :style="{ height: graphParam[index].blank + 'px' }"></div>
      <div class="intro-graph__yaxis-item__right" :style="{ height: graphParam[index].right + 'px' }">
        <div :class="`intro-graph__yaxis-item__right--bg${ index + 1 }`"></div>
      </div>
      <div class="intro-graph__yaxis-item__area">
        <div :class="`intro-graph__yaxis-item__area--bg${ index + 1 }`" :style="{ 'border-bottom-right-radius': (index === (yieldRate.length - 1)) ? 0 : '2px' }"></div>
      </div>
    </div>
    <div
      v-show="showTips || (markPos > 2)"
      class="intro-graph__yaxis-tips intro-graph__yaxis-tips--left"
      :style="{ 'opacity': tipsAnim ? 1: 0, 'top': isNew ? ((64 - 46) + 'px') : '' }"
      ref="leftTips"
    >{{ yieldRate[0] }}%</div>
    <div
      v-show="showTips || (markPos < (yieldRate.length / 2))"
      class="intro-graph__yaxis-tips intro-graph__yaxis-tips--right"
      :style="{ 'opacity': tipsAnim ? 1: 0 }"
      ref="rightTips"
    >{{ yieldRate[yieldRate.length - 1] }}%</div>
    <div
      class="intro-graph__yaxis-mark"
      :style="{
        'left': (yaxisItemWidth * (markPos - 1) + yaxisItemWidth / 2 + (markPos - 1) * 2 - 5) + 'px',
        'opacity': tipsAnim ? 1: 0
      }"
    >
      <div class="intro-graph__yaxis-mark__line"></div>
      <div class="intro-graph__yaxis-mark__other" :style="{ 'top': (graphParam[markPos - 1].blank + graphParam[markPos - 1].right + 46 / 2 - 13) + 'px' }">
        <div class="intro-graph__yaxis-mark__triangle"></div>
        <div class="intro-graph__yaxis-mark__point"></div>
        <div class="intro-graph__yaxis-mark__dialog" :style="{ 'left': (-142/4 + 4 + dialogAddLeft) + 'px' }">
          <div>年化{{ yieldRate[markPos - 1] }}%</div>
          <!-- <div style="margin-top: 3px;">{{ getRatioDialogDate }}</div> -->
        </div>
      </div>
    </div>
    <div class="intro-graph__yaxis-touchmask" >
      <div
        v-for="(item, index) in yieldRate.length"
        @touchstart="selectCycle($event)"
        @touchmove="moveMark($event)"
        @touchend="leaveMark(index)"
        :style="{ 'width': (100 / yieldRate.length) + '%' }"
      ></div>
    </div>
    <div class="intro-graph__yaxis-animmask" :style="{ width: (lineAnim ? 0: 100) + '%' }"></div>
  </div>
  <!-- <div class="intro-graph__xaxis ssui-1px-t">
    <div v-for="(item, index) in (yieldRate.length + 1)">{{ index === 0 ? timeUnit.unit : index * timeUnit.cycle }}</div>
  </div> -->
</div>
</div>
</template>

<script>
/*eslint-disable*/
export default {
  props: {
    productDetail: Object,
    timeUnit: Object,
    isNew: Boolean,
  },
  data() {
    return {
      canAnimate: false,
      yieldRate: [1,2,3,4,5,6],
      markPos: 1, // 标线的位置
      canScroll: true, // 是否可以滚动
      showTips: true, // 是否显示左右tips
      dialogAddLeft: 0, // 标线中间框的left增量
      startXPos: 0, // 在图表上移动时X的初始位置
      startYPos: 0, // 在图表上移动时Y的初始位置
      isMoving: false, // 是否在图标上左右滑动
      canMove: true, // 能否在图标上左右滑动
      lineAnim: false, // 折线动画
      tipsAnim: false, // tips动画
      leftTipsWidth: 0, // 左tips宽度
      rightTipsWidth: 0, // 右tips宽度
    }
  },
  computed: {
    yaxisItemWidth() {
      return (document.documentElement.clientWidth - (15 * 2) - (8 * 2) - (2 * (this.yieldRate.length - 1))) / this.yieldRate.length
    },
    graphParam() {
      const maxRate = this.yieldRate[this.yieldRate.length - 1]
      const minRate = this.yieldRate[0]
      const heightArr = []
      let minGraphHeight = 25
      if (this.isNew) {
        minGraphHeight = 71
      }
      for (let i = 0; i < this.yieldRate.length - 1; i++) {
        heightArr.push({ right: (this.yieldRate[i + 1] - this.yieldRate[i]) * (112 - minGraphHeight) / (maxRate - minRate) })
      }
      for (let i = 0; i < heightArr.length; i++) {
        let sum = 0
        for (let j = i + 1; j < heightArr.length; j++) {
          sum += heightArr[j].right
        }
        heightArr[i].blank = sum
      }
      heightArr.push({ right: 0, blank: 0 })
      return heightArr
    },
    // getRatioDialogDate() {
    //   if (this.timeUnit.cycle === 1) {
    //     return `第${this.markPos}个${this.timeUnit.unit}`
    //   }
    //   return `第${((this.markPos - 1) * this.timeUnit.cycle) + 1}-${this.markPos * this.timeUnit.cycle}个${this.timeUnit.unit}`
    // },
  },
  methods: {
    // 选择周期
    selectCycle(event) {
      this.startXPos = event.touches[0].pageX
      this.startYPos = document.body.scrollTop
    },
    // 在图表上移动
    moveMark(event) {
      this.isMoving = true
      if (!this.canMove) {
        return
      }
      const diffX = Math.abs(event.touches[0].pageX - this.startXPos)
      const diffY = Math.abs(document.body.scrollTop - this.startYPos)
      // 是否x、y方向移动的距离都小于10
      if (diffX <= 10 && diffY <= 10 && this.canScroll) {
        return
      }
      // y方向大于10，则判断为滚屏
      if (diffY > 10) {
        this.canMove = false
        return
      }
      // x方向大于10，则判断为移动图表
      if (diffX > 10) {
        this.canScroll = false
      }
      let markPos = Math.floor((event.touches[0].pageX - 8 - 15) / ((document.documentElement.clientWidth - 16 - 30) / this.yieldRate.length))
      if (markPos > this.yieldRate.length) {
        markPos = this.yieldRate.length
      }
      if (markPos < 0) {
        markPos = 0
      }
      if (markPos > this.yieldRate.length - 1) {
        markPos = this.yieldRate.length - 1
      }
      this.markPos = markPos + 1
    },
    // 手指离开图表
    leaveMark(markPos) {
      if (!this.isMoving) {
        this.markPos = markPos + 1
      }
      this.canScroll = true
      this.isMoving = false
      this.canMove = true
    },
    maxShowTipsPos(isLeft) {
      const longerTimes = ((142 / 4) + (isLeft ? this.leftTipsWidth : this.rightTipsWidth)) / this.yaxisItemWidth
      const tmpNum = Math.floor(((142 / 4) + (isLeft ? this.leftTipsWidth : this.rightTipsWidth) - (2 * Math.floor(longerTimes))) / this.yaxisItemWidth * 2)
      if (tmpNum % 2 === 0) {
        return (tmpNum / 2) + 1
      }
      return ((tmpNum + 1) / 2) + 1
    },
  },
  watch: {
    // eslint-disable-next-line
    markPos: function(val, oldVal) {
      if (val > (this.yieldRate.length - this.maxShowTipsPos() + 1) || val < this.maxShowTipsPos(true)) {
        this.showTips = false
        if (val > (this.yieldRate.length / 2)) {
          const diffWidth = ((this.yieldRate.length - val + 0.5) * this.yaxisItemWidth) + ((this.yieldRate.length - val) * 2) - (142 / 4) + 1
          if (diffWidth < 0) {
            this.dialogAddLeft = diffWidth
          } else {
            this.dialogAddLeft = 0
          }
        } else {
          const diffWidth = ((val - 0.5) * this.yaxisItemWidth) + ((val - 1) * 2) - (142 / 4) - 1
          if (diffWidth < 0) {
            this.dialogAddLeft = -diffWidth
          } else {
            this.dialogAddLeft = 0
          }
        }
      } else {
        this.showTips = true
        this.dialogAddLeft = 0
      }
    },
    // eslint-disable-next-line
    canAnimate: function(val, oldVal) {
      if (val) {
        this.lineAnim = true
        setTimeout(() => {
          this.tipsAnim = true
          setTimeout(() => {
            this.leftTipsWidth = this.$refs.leftTips.offsetWidth
            this.rightTipsWidth = this.$refs.rightTips.offsetWidth
          }, 320)
        }, 1000)
        this.markPos = Math.floor(this.yieldRate.length / 2) + 1
        document.addEventListener('touchmove', (e) => {
          if (!this.canScroll) {
            e.preventDefault()
          }
        })
      }
    },
  },
  mounted() {
    this.canAnimate = true;
  }
}
/*eslint-disable*/
</script>

<style lang="less" scoped>
.intro {
  padding: 20px 15px 19px;
}
.intro-graph {
  // position: relative;
  // height: 270/2px;
  margin-top: 40/2px;
  padding-top: 46/2px;
  .intro-graph__yaxis {
    position: relative;
    display: flex;
    margin: 0 16/2px;
    height: (270-46)/2px;
    background: linear-gradient(to bottom, #fee7e0, #fff);
    .intro-graph__yaxis-item {
      display: flex;
      flex-direction: column;
      .intro-graph__yaxis-item__blank {
        background-color: #fff;
      }
      .intro-graph__yaxis-item__right {
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
        > div {
          width: 2px;
          border-top-left-radius: 2px;
          &.intro-graph__yaxis-item__right--bg1 {
            background-color: #f7a43e;
          }
          &.intro-graph__yaxis-item__right--bg2 {
            background-color: #f7a13f;
          }
          &.intro-graph__yaxis-item__right--bg3 {
            background-color: #f89c41;
          }
          &.intro-graph__yaxis-item__right--bg4 {
            background-color: #f89844;
          }
          &.intro-graph__yaxis-item__right--bg5 {
            background-color: #f99346;
          }
          &.intro-graph__yaxis-item__right--bg6 {
            background-color: #f98e48;
          }
          &.intro-graph__yaxis-item__right--bg7 {
            background-color: #f98a4a;
          }
          &.intro-graph__yaxis-item__right--bg8 {
            background-color: #fa864c;
          }
          &.intro-graph__yaxis-item__right--bg9 {
            background-color: #fa824e;
          }
          &.intro-graph__yaxis-item__right--bg10 {
            background-color: #fb7f50;
          }
          &.intro-graph__yaxis-item__right--bg11 {
            background-color: #fb7c51;
          }
        }
      }
      .intro-graph__yaxis-item__area {
        flex: 1;
        > div {
          height: 2px;
          border-bottom-right-radius: 2px;
          &.intro-graph__yaxis-item__area--bg1 {
            background: linear-gradient(to right, #f5b635, #f7a43e);
          }
          &.intro-graph__yaxis-item__area--bg2 {
            background: linear-gradient(to right, #f7a43e, #f7a13f);
          }
          &.intro-graph__yaxis-item__area--bg3 {
            background: linear-gradient(to right, #f7a13f, #f89c41);
          }
          &.intro-graph__yaxis-item__area--bg4 {
            background: linear-gradient(to right, #f89c41, #f89844);
          }
          &.intro-graph__yaxis-item__area--bg5 {
            background: linear-gradient(to right, #f89844, #f99346);
          }
          &.intro-graph__yaxis-item__area--bg6 {
            background: linear-gradient(to right, #f99346, #f98e48);
          }
          &.intro-graph__yaxis-item__area--bg7 {
            background: linear-gradient(to right, #f98e48, #f98a4a);
          }
          &.intro-graph__yaxis-item__area--bg8 {
            background: linear-gradient(to right, #f98a4a, #fa864c);
          }
          &.intro-graph__yaxis-item__area--bg9 {
            background: linear-gradient(to right, #fa864c, #fa824e);
          }
          &.intro-graph__yaxis-item__area--bg10 {
            background: linear-gradient(to right, #fa824e, #fb7f50);
          }
          &.intro-graph__yaxis-item__area--bg11 {
            background: linear-gradient(to right, #fb7f50, #fb7c51);
          }
          &.intro-graph__yaxis-item__area--bg12 {
            background: linear-gradient(to right, #fb7c51, #fb7a52);
          }
        }
      }
    }
    .intro-graph__yaxis-tips {
      position: absolute;
      height: 30/2px;
      padding: 0 6/2px;
      min-width: 50/2px;
      line-height: 30/2px;
      text-align: center;
      font-size: 20/2px;
      color: #fff;
      background-color: #fb7a52;
      transition: opacity .3s;
      &::after {
        content: ' ';
        position: absolute;
        bottom: -6/2px;
        height: 6/2px;
        width: 10/2px;
        border-width: 6/2px 10/2px;
        border-style: solid;
        border-top-color: #fb7a52;
        border-bottom-color: transparent;
      }
      &.intro-graph__yaxis-tips--left {
        top: (224-50-30-10-6)/2px;
        left: 0;
        border-radius: 4px 4px 4px 0;
        &::after {
          left: 0;
          border-left-color: #fb7a52;
          border-right-color: transparent;
        }
      }
      &.intro-graph__yaxis-tips--right {
        top: -(30+10+6)/2px;
        right: 0;
        border-radius: 4px 4px 0 4px;
        &::after {
          right: 0;
          border-left-color: transparent;
          border-right-color: #fb7a52;
        }
      }
    }
    .intro-graph__yaxis-mark {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      width: 18/2px;
      height: 270/2px;
      transition: left .3s;
      .intro-graph__yaxis-mark__line {
        width: 1px;
        background-color: #fb7a52;
      }
      .intro-graph__yaxis-mark__other {
        position: absolute;
        top: 0;
        left: 0;
        transition: top .3s;
      }
      .intro-graph__yaxis-mark__triangle {
        // position: absolute;
        // top: 40px;
        // left: 0;
        width: 18/2px;
        height: 18/2px;
        border-width: 18/4px 18/4px;
        border-style: solid;
        border-color: transparent;
        border-top-color: #fb7a52;
        &::after {
          content: ' ';
          position: absolute;
          top: -1px;
          left: 0;
          width: 18/2px;
          height: 18/2px;
          border-width: 18/4px 18/4px;
          border-style: solid;
          border-color: transparent;
          border-top-color: #fff;
          z-index: 1;
        }
      }
      .intro-graph__yaxis-mark__point {
        // position: absolute;
        // top: 64px;
        // left: 0;
        width: 18/2px;
        height: 18/2px;
        // margin-top: 10/2px;
        border: 2px solid #fff;
        border-radius: 50%;
        background-color: #fb7a52;
      }
      .intro-graph__yaxis-mark__dialog {
        position: absolute;
        top: -66/2px;
        left: -142/4+4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 142/2px;
        height: 66/2px;
        line-height: 1;
        border-radius: 5px;
        font-size: 20/2px;
        color: #fb7a52;
        background-color: #fff;
        transition: left .3s;
        &::after {
          content: ' ';
          position: absolute;
          width: 200%;
          height: 200%;
          top: 0px;
          left: 0px;
          transform: scale(0.5);
          transform-origin: 0px 0px 0px;
          border: 1px solid #fb7a52;
          border-radius: 10px;
        }
      }
    }
    .intro-graph__yaxis-touchmask {
      position: absolute;
      top: -46px;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      // > div {
      //     width: 100/7%;
      // }
    }
    .intro-graph__yaxis-animmask {
      position: absolute;
      top: -46/2px;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      transition: width 1s;
    }
  }
  .intro-graph__xaxis {
    display: flex;
    justify-content: space-between;
    padding-top: 12/2px;
    line-height: 1;
    font-size: 20/2px;
    color: #dcdcdc;
    > div {
      width: 16px;
      text-align: center;
    }
  }
}
</style>
