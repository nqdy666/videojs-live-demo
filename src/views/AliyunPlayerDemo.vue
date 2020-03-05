<template>
  <div class="home">
    <div v-if="playerShow1" class="zhibo-video" :class="{'small-video': smallVideo === 'video1'}" @click="handleClick('video1')">
      <vue-aliplayer-v2 
        id="player-11"
        ref="player1"
        :options="options1"
        @ready="handleReady1"
        />
    </div>
    <div v-if="playerShow2" class="zhibo-video" :class="{'small-video': smallVideo === 'video2'}" @click="handleClick('video2')">
      <vue-aliplayer-v2 
        id="player-22" 
        ref="player2"
        @ready="handleReady2"
        :options="options2"
        />
    </div>
  </div>
</template>

<script>
import VueAliplayerV2 from './VueAliplayer';

export default {
  name: 'home',
  components: {
    'vue-aliplayer-v2': VueAliplayerV2
  },
  data () {
    return {
      smallVideo: 'video1',
      playerShow1: true,
      playerShow2: false,
      options1: {
        source:'/live/av0.m3u8',
        height: '100%',
        width: '100%',
        isLive: true,
        preload: true,
        autoplay: true,
        playsinline: true,
        // x5_type: 'h5',
        // x5_fullscreen: false,
      },
      options2: {
        source:'/live/teacher.m3u8',
        height: '100%',
        width: '100%',
        isLive: true,
        preload: true,
        autoplay: true,
        playsinline: true,
        // x5_type: 'h5',
        // x5_fullscreen: false,
      },
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.$refs.player1.play()
    // }, 3 * 1000)
    document.addEventListener('WeixinJSBridgeReady', () => {
      setTimeout(() => {
        this.$refs.player1.play()
      }, 1 * 1000)
    })
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
    handleReady1 () {
      setTimeout(() => {
        this.$refs.player1.play()
      }, 5 * 1000)
      console.log('ready1')
      this.playerShow2 = true
      // this.$refs.player2.loadByUrl('/live/teacher.m3u8')
    },
    handleReady2 () {
      this.$refs.player2.play()
      console.log('ready2')
    }
  },
  beforeDestroy () {
    this.$refs.player1 && this.$refs.player1.dispose()
    this.$refs.player2 && this.$refs.player2.dispose()
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
    overflow: hidden;
  }
  .small-video {
    left: 20px;
    top: 20px;
    width: 300px;
    height: 300px;
    z-index: 1;
  }
}
</style>
