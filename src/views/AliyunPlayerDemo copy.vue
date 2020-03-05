<template>
  <div class="home">
    <vue-aliplayer-v2 
      id="player-1" 
      class="zhibo-video"
      :options="options1"
      :class="{'small-video': smallVideo === 'video1'}"
      @click="handleClick('video1')"/>
    <vue-aliplayer-v2 
      id="player-2" 
      class="zhibo-video"
      :options="options2"
      :class="{'small-video': smallVideo === 'video2'}"
      @click="handleClick('video2')"/>
  </div>
</template>

<script>
import VueAliplayerV2 from 'vue-aliplayer-v2';

export default {
  name: 'home',
  components: {
    'vue-aliplayer-v2': VueAliplayerV2.Player
  },
  data () {
    return {
      smallVideo: 'video1',
      options1: {
        source:'/live/av0.flv'
      },
      options2: {
        source:'/live/teacher.flv'
      },
    }
  },
  mounted () {
  },
  methods: {
    handleClick (type) {
      if (type !== this.smallVideo) return
      if (this.smallVideo === 'video1') {
        this.smallVideo = 'video2'
      } else {
        this.smallVideo = 'video1'
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .zhibo-video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .small-video {
    left: 20px;
    top: 20px;
    width: 200px;
    height: 200px;
    z-index: 1;
  }
}
</style>
