<template>
  <div>
    <m-swipe swipeid="swipe" ref="swiper" :autoPlay="3000" effect="slide">
      <div @click="go(top.id)" v-for="top in tops" :key="top.id" class="swiper-slide" slot="swiper-con" >
        <img :src="top.image">
        <div></div>
        <h3>{{top.title}}</h3>
      </div>
    </m-swipe>
  </div>
</template>
<script>
import swiper from "../components/swipe/swipe";
import api from "../api/index";
export default {
  components: {
    "m-swipe": swiper
  },
  data() {
    return {
      swiper: "",
      tops: []
    };
  },
  mounted() {
    this.getList(1);
    let swiper = this.$refs.swiper;
    if (swiper.dom) {
      this.swiper = swiper.dom;
    }
  },
  activated() {
    if (this.swiper) {
      this.swiper.autoplay.start();
    }
  },
  deactivated() {
    if (this.swiper) {
      this.swiper.autoplay.stop();
    }
  },
  methods: {
    getList(type) {
      var vue = this;
      if (type) {
        api.getNews().then(data => {
          vue.tops = data.data.top_stories;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@blue: #5b7492;
@yellow: #ffd300;
.app-view {
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    height: 8rem;
    overflow: hidden;
    position: relative;
  }
}
.swiper-slide {
  div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
    background-color: @blue;
  }
  img {
    top: 50%;
    position: relative;
    transform: translate(0, -50%);
  }
  h3 {
    width: 70%;
    color: #fff;
    margin: 0;
    font-size: 0.5rem;
    line-height: 1rem;
    right: 5%;
    bottom: 2.6rem;
    text-align: right;
    position: absolute;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    &:before {
      content: "";
      width: 3rem;
      bottom: -0.6rem;
      right: 0;
      display: block;
      position: absolute;
      border: 2px solid @yellow;
    }
  }
}
</style>


