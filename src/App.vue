<template>
  <div id="app">
    <header class="header">
      <i v-if="!flag" class="iconfont icon-ic_menu" @click="toggle(true)"></i>
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
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from './api/index'
export default {
  data() {
    return {
      open: false,
      docked: false,
      list:[]
    };
  },
  mounted () {
    let vue = this;
    api.getTopics().then(data=>{
      vue.list = data.data.others;
    })
  },
  computed: mapState({
    flag: state => state.drawer
  }),
  methods: {
    back(n) {},
    toggle() {},
    change(id){

    },
    jump(){
      window.open("https://github.com/LRH1993/daily-zhihu");
    }
  }
};
</script>

<style>

</style>
