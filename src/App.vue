<template>
  <div id="app">
    <header class="header">
      <i v-if="!flag" class="iconfont icon-ic_menu" @click="toggle()"></i>
      <i v-if="flag" class="iconfont icon-ic_back" @click="back()"></i>
    </header>
    <aside class="aside" :class="{open:open,docked:docked}" @click="toggle()">
      <ul>
        <li :class="{chose:num==1}" @click="change(1)">
          <span>首页</span>
          <i class="iconfont" :class="{'iconcolor icon-ic_star_black':num==1,'icon-ic_star':num!=1}"></i>
        </li>
        <li :class="{chose :num==x.id}" v-for="(x) in list" @click="change(x.id)" :key="x.id">
          <span>{{x.name}}</span>
          <i class="iconfont" :class="{'iconcolor icon-ic_star_black':num==x.id,'icon-ic_star':num!=x.id}"></i>          
        </li>
        <li @click="jump()">
          <span>项目地址</span>
          <i class="iconfont icon-github"></i>
        </li>
      </ul>
     <div class="cover" @touchmove.prevent></div>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "./api/index";
export default {
  data() {
    return {
      open: false,
      docked: false,
      list: []
    };
  },
  mounted() {
    let vue = this;
    api.getTopics().then(data => {
      vue.list = data.data.others;
    });
  },
  computed: mapState({
    flag: state => state.drawer,
    num: state => state.num
  }),
  methods: {
    back(n) {},
    toggle() {
      if (!this.open) {
        this.open = true;
        this.docked = true;
      } else {
        this.open = false;
        let vue = this;
        setTimeout(function() {
          vue.docked = false;
        }, 300);
      }
    },
    change(id) {},
    jump() {
      window.open("https://github.com/LRH1993/daily-zhihu");
    }
  }
};
</script>

<style lang="less">
.header {
  width: 100%;
  height: 1.5rem;
  z-index: 9;
  padding-left: 5%;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.51) 95%
  );
  .iconfont {
    color: #fff;
    font-size: 0.8rem;
    top: 20%;
    position: relative;
  }
}
.aside {
  z-index: 11;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    opacity: 0 !important;
  }
  ul {
    margin: 0;
    float: left;
    width: 60%;
    height: 100%;
    padding: 1.3rem 0.5rem 0.5rem;
    overflow: auto;
    background: rgba(91, 116, 146, 0.75);
    transform: translate(-100%, 0);
    transition: transform 0.3s ease;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      opacity: 0 !important;
    }
  }
  li {
    cursor: pointer;
    font-size: 0.43rem;
    list-style: none;
    color: #fff;
    margin-top: 20px;
    .iconfont {
      float: right;
      font-size: 0.6rem;
    }
    &.chose {
      color: #ffd300;
    }
  }
  .cover {
    width: 100%;
    height: 100%;
    opacity: 0;
    display: none;
    background: rgba(172, 185, 201, 0.4);
    transition: opacity 0.3s esse;
  }
  &.open {
    ul {
      transform: translate(0);
    }
    .cover {
      opacity: 1;
    }
  }
  &.docked {
    visibility: visible;
    .cover {
      display: block;
    }
  }
}
</style>

