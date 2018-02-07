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
    <div v-if="circle" class="circle" @click="top()">
      <i class="iconfont icon-ic_top"></i>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="app-view" :class="{'app-view-hidden':docked}"></router-view>
      </keep-alive>
    </transition>
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
      list: [],
      transitionName: "slide-left"
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
    num: state => state.num,
    circle: state => state.circleFlag
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
    change(id) {
      let path = id === 1 ? "home" : "theme";
      this.$router.push({
        name: path,
        query: {
          id: id || ""
        }
      });
      this.$store.commit('add',id);
    },
    top() {
      let vue = this;
      let dom = document.querySelector(".app-view");
      let height = dom.scrollTop;
      let scrollTop = parseInt(height / 50);
      let time = setInterval(function() {
        height -= scrollTop;
        if (height <= 0) {
          dom.scrollTop = 0;
          vue.$store.commit("toggle");
          clearInterval(time);
        } else {
          dom.scrollTop = height;
        }
      }, 1);
    },
    jump() {
      window.open("https://github.com/LRH1993/daily-zhihu");
    }
  }
};
</script>

<style lang="less">
.app-view {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: absolute;
  transition: transform 0.3s ease;
  -webkit-overflow-scrolling: touch;
}
.app-view-hidden {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 1.5rem;
  z-index: 9;
  padding-left: 5%;
  position: fixed;
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
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  right: 5%;
  bottom: 5vw;
  position: fixed;
  z-index: 10;
  i {
    top: 50%;
    left: 50%;
    position: absolute;
    font-size: 0.6rem;
    color: #acb9c9;
    transform: translate(-50%, -50%);
  }
}
@media screen and (min-width: 640px) {
  .app-view {
    width: 640px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .aside ul {
    width: 350px;
  }
}
</style>

