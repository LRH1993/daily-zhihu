<template>
  <div>
    <m-swipe swipeid="swipe" ref="swiper" :autoPlay="3000" effect="slide">
      <div @click="go(top.id)" v-for="top in tops" :key="top.id" class="swiper-slide" slot="swiper-con" >
        <img :src="top.image">
        <div></div>
        <h3>{{top.title}}</h3>
      </div>
    </m-swipe>
    <div class="list" v-for="x in list" :key="x.date">
      <p class="list-time">{{x.date.substring(0,4)+"/"+x.date.substring(4,6)+"/"+x.date.substring(6,8)}}</p>
      <div class="list-con" @click="go(y.id)" v-for="y in x.stories" :key="y.id">
        <img :src="y.images[0]">
        <p>{{y.title}}</p>
      </div>
    </div>
    <div class="loading" v-if="!list.length">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
    <infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"></infinite-scroll>
  </div>
</template>
<script>
import swiper from "../components/swipe/swipe";
import infiniteScroll from "../components/inifniteScroll";
import api from "../api/index";
export default {
  components: {
    "m-swipe": swiper,
    "infinite-scroll": infiniteScroll
  },
  data() {
    return {
      swiper: "",
      tops: [],
      list: [],
      loading: false,
      scroller: null,
      count: 1
    };
  },
  mounted() {
    this.getList(1);
    this.scroller = this.$el;
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
          vue.list.push(data.data);
        });
      } else {
        api.getNewsByDate(vue.GetDate(vue.count)).then(data => {
          vue.list.push(data.data);
          vue.loading = false;
        });
      }
    },
    loadMore() {
      let vue = this;
      this.loading = true;
      setTimeout(() => {
        vue.count--;
        vue.getList();
      }, 500);
    },
    GetDate(Count) {
      var dd = new Date();
      dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      m = m >= 10 ? m : "0" + m;
      var d = dd.getDate();
      d = d >= 10 ? d : "0" + d;
      return y + "" + m + "" + d;
    }
  }
};
</script>
<style lang="less" scoped>
@blue: #5b7492;
@yellow: #ffd300;
@gray: #acb9c8;
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
.list {
  width: 90%;
  z-index: 1;
  position: relative;
  padding-top: 0.8rem;
  margin: 0.8rem auto 0;
  &-time {
    top: 0;
    margin: 0;
    color: #fff;
    padding: 0.1rem;
    font-size: 0.4rem;
    background-color: @yellow;
    line-height: 0.8rem;
    letter-spacing: 0.1rem;
    border-radius: 0.4rem;
    text-align: center;
    transform: translate(0, -50%);
    position: absolute;
    box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
  }
  &-con {
    cursor: pointer;
    display: flex;
    padding: 0.3rem;
    margin-bottom: 0.4rem;
    border-radius: 0.15rem;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
    img {
      width: 2rem;
      margin-right: 0.4rem;
    }
    p {
      color: @blue;
      font-size: 0.4rem;
      text-align: justify;
      margin: 0;
    }
  }
}
.loading {
  width: 25%;
  height: 0.4rem;
  margin: 25% auto 0;
  position: relative;
  span {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: absolute;
    background: @blue;
  }
  .left {
    background-color: @yellow;
    animation: lMove 1.5s ease infinite;
  }
  .middle {
    left: 50%;
    animation: mMove 1.5s ease infinite;
  }
  .right {
    left: 100%;
    background-color: @gray;
    animation: rMove 1.5s ease infinite;
  }
}
@keyframes lMove {
  0% {
    left: 0;
  }
  25% {
    left: 50%;
    background-color: @yellow;
  }
  50% {
    left: 100%;
    background-color: @blue;
  }
  75% {
    left: 50%;
    background-color: @gray;
  }
  100% {
    left: 0%;
  }
}
@keyframes mMove {
  0% {
  }
  25% {
    background: @blue;
  }
  50% {
    background: @yellow;
  }
  75% {
    background: @blue;
  }
  100% {
  }
}
@keyframes rMove {
  0% {
    left: 100%;
  }
  25% {
    left: 50%;
    background: @blue;
  }
  50% {
    left: 0;
    background: @gray;
  }
  75% {
    left: 50%;
    background: @yellow;
  }
  100% {
    left: 100%;
  }
}
</style>


