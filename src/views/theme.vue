<template>
  <div>
      <div class="loading" v-if="!list">
		<span class="left"></span>
    	<span class="middle"></span>
    	<span class="right"></span>
	</div>
    <div v-else>
		<div class="theme">
			<img :src="list.image">
			<div></div>
			<h3>
			<p>{{list.description}}</p>
			<p>{{list.name}}</p>
            </h3>
		</div>
		<div class="list">
			<div class="list-con" @click="go(y.id)" v-for="y in list.stories" :key="y.id">
				<img v-if="y.images" :src="y.images[0]" />
				<p>{{y.title}}</p>
			</div>
		</div>
	</div>
    <back-scroll :scroller="scroller" :flag="circle"></back-scroll>
  </div>
</template>
<script>
import api from "../api/index";
import { mapState } from "vuex";
import backScroll from "../components/backScroll";
export default {
  components: {
    "back-scroll": backScroll
  },
  data() {
    return {
      list: [],
      scroller: window
    };
  },
  mounted: function() {
    this.scroller = this.$el;
    this.$store.commit("add", this.$route.query.id);
  },
  computed: {
    ...mapState({
      flag: state => state.num,
      circle: state => state.circleFlag,
      theme: state => state.theme
    })
  },
  watch: {
    flag() {
      this.getList();
    }
  },
  methods: {
    getList() {
      let vue = this;
      let id = this.$route.query.id;
      this.list = "";
      let dom = document.querySelector(".app-view");
      dom.scrollTop = 0;
      if (this.theme.hasOwnProperty(id)) {
        this.list = this.theme[id];
      } else {
        api.getTopicById(id).then(function(data) {
          vue.theme[id] = data.data;
          vue.list = data.data;
        });
      }
    },
    go(id) {
      this.$router.push({
        path: "article",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@yellow: #ffd300;
@blue: #5b7492;
@gray: #acb9c8;
.theme {
  height: 8rem;
  position: relative;
  overflow: hidden;
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
    width: auto;
    height: 8rem;
    position: relative;
  }
  h3,
  p {
    margin: 0;
  }
  h3 {
    width: 70%;
    color: #fff;
    font-size: 0.5rem;
    line-height: 1rem;
    right: 5%;
    bottom: 1.5rem;
    text-align: right;
    position: absolute;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    p:first-child {
      position: relative;
      margin-bottom: 0.5rem;
      &:before {
        content: "";
        width: 3rem;
        bottom: -0.3rem;
        right: 0;
        display: block;
        position: absolute;
        border: 2px solid @yellow;
      }
    }
  }
}
.list {
  margin: 0.5rem auto 0;
  width: 90%;
  z-index: 1;
  position: relative;
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
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: absolute;
    background: @blue;
    transform: translate(-50%, 0);
  }
  .left {
    background: @yellow;
    animation: lMove 2.5s ease infinite;
  }
  .middle {
    left: 50%;
    animation: mMove 2.5s ease infinite;
  }
  .right {
    left: 100%;
    background: @gray;
    animation: rMove 2.5s ease infinite;
  }
}
@keyframes lMove {
  0% {
    left: 0;
  }
  25% {
    left: 50%;
    background: @yellow;
  }
  50% {
    left: 100%;
    background: @blue;
  }
  75% {
    left: 50%;
    background: @gray;
  }
  100% {
    left: 0;
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
