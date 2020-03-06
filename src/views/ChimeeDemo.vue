<template>
  <div class="home">
    <div v-if="playerShow1" class="zhibo-video" :class="{'small-video': smallVideo === 'video1'}" @click.stop="handleClick('video1')">
      <chimeePlayer
        id="player-11"
        ref="player1"
        :options="options1"
        />
    </div>
    <div v-if="playerShow2" class="zhibo-video" :class="{'small-video': smallVideo === 'video2'}" @click.stop="handleClick('video2')">
      <chimeePlayer
        id="player-22" 
        ref="player2"
        :options="options2"
        />
    </div>
  </div>
</template>

<script>
import ChimeePlayer from './ChimeePlayer';

export default {
  name: 'home',
  components: {
    ChimeePlayer
  },
  data () {
    return {
      smallVideo: 'video1',
      playerShow1: true,
      playerShow2: true,
      options1: {
        box: 'flv',
        src: '/desktop/e485dcede1b6432f8564e811f57e5c6c.flv?auth_key=1583550097-0-0-e1308261d266e7ffa6e9207faa740104',
        // src: '/flv?port=1935&app=hls&stream=test',
        // src: '/live/av0.m3u8',
        // x5_type: 'h5',
        // x5_fullscreen: false,
      },
      options2: {
        box: 'flv',
        src: '/teacher/6458d0505a9642389fb81e00232a8259.flv?auth_key=1583550097-0-0-d5a58de72eed172f25ca2bc8d14069fd',
        // src: '/live/teacher.m3u8',
        // x5_type: 'h5',
        // x5_fullscreen: false,
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
    // this.$refs.player1 && this.$refs.player1.dispose()
    // this.$refs.player2 && this.$refs.player2.dispose()
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
    height: 600px;
    overflow: hidden;
    z-index: 2;
  }
  .small-video {
    left: 20px;
    top: 20px;
    width: 300px;
    height: 300px;
    z-index: 3;
  }
}
</style>
