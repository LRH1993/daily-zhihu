<template>
  <div class="swiper-container" :class="swipeid">
      <div class="swiper-wrapper">
          <!-- 存放具体的轮播内容 -->
          <slot name ="swiper-con"></slot>
      </div>
      <!-- 分页器 -->
      <div :class="{'swiper-pagination':pagination}"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    swipeid: {
      type: String,
      default: ""
    },
    effect: {
      type: String,
      default: "slide"
    },
    loop: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationType: {
      type: String,
      default: "bullets"
    },
    autoPlay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dom: ""
    };
  },
  mounted() {
    var that = this;
    this.dom = new Swiper("." + that.swipeid, {
      //循环
      loop: that.loop,
      //分页器
      pagination: { 
        el: ".swiper-pagination",
        bulletClass : 'swiper-pagination-bullet',
            },
      //分页类型
      paginationType: that.paginationType,
      //自动播放
      autoPlay: that.autoPlay,
      //方向
      direction: that.direction,
      //特效
      effect: that.effect,
      //用户操作swiper之后，不禁止autoplay
      disableOnInteraction: false,
      //修改swiper自己或子元素时，自动初始化swiper
      observer: true,
      //修改swiper的父元素时，自动初始化swiper
      observeParents: true
    });
  }
};
</script>

<style>
.swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 1rem;
    width: 95%;
    text-align: right;
  }
</style>
