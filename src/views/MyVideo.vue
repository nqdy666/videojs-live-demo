<template>
  <div>
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :events="events"
      cross-origin="anonymous"
      :options="playerOptions"
      @click.native="onTouchstart($event)"
      @touchstart="onTouchstart($event)"
      @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)"
    ></video-player>
  </div>
</template>
<script>
import { addListener, removeListener } from 'resize-detector'

export default {
  props: {
    src: {
      type: String,
    },
    type: {
      type: String,
    }
  },
  mounted () {
    addListener(this.$el, this.__resizeHandler)
    this.resize()
  },
  methods: {
    __resizeHandler () {
      this.resize()
    },
    resize() {
      this.height = this.$el.clientHeight
    },
    // https://github.com/videojs/video.js/issues/5403
    onTouchstart () {
      this.$emit('click')
    },
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    }
  },
  beforeDestroy () {
    removeListener(this.$el, this.__resizeHandler)
  },
  data () {
    return {
      height: 100,
       events: [
        'touchstart'
      ]
    }
  },
  computed: {
    playerOptions() {
      return {
        techOrder: ["html5", 'flvjs', "flash"],
        flvjs: {
          mediaDataSource: {
            isLive: true,
            cors: true,
            withCredentials: false,
          },
        },
        playsinline: true,
        controls: false,
        // liveui: true, // 直播相关，m3u8情况下默认是true
        responsive: true,
        // fluid: true,
        // aspectRatio: "16:9",
        bigPlayButton: false,
        height: this.height,
        preload: "auto",
        autoplay: true,
        muted: false,
        language: "zh",
        playbackRates: [],
        sources: [
          {
            // src: "rtmp://120.77.78.199:1935/hls/test"
            type: 'video/x-flv',
            src: this.src, // '/hls/test.m3u8'
            // src: "https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm"
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ]
      };
    }
  }
};
</script>
<style lang="scss" scoped></style>
