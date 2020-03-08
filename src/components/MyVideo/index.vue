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
import { addListener, removeListener } from 'resize-detector/dist'
import videoPlayer from './VueVideoJsPlayer'
import { isWeixin, isIOS, isIE11 } from './util'

export default {
  components: {
    videoPlayer,
  },
  props: {
    flvSrc: {
      type: String,
    },
    hlsSrc: {
      type: String,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    poster: {
      type: String,
      default: ''
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
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // console.log("example player 1 readied", player);
      // console.log('example 01: the player is readied', player)
       this.$emit('ready')
    },
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
      let type = ''
      let src = ''
      if (isIOS) {
        src = this.hlsSrc
      } else if (isIE11) {
        src = this.hlsSrc
        type = ''
      } else {
        src = this.flvSrc
        type = 'video/x-flv'
      }
      let autoplay = true
      if (isWeixin && type !== 'video/x-flv') {
        autoplay = false
      }
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
        // // liveui: true, // 直播相关，m3u8情况下默认是true
        responsive: true,
        loop: true,
        fluid: false,
        // // aspectRatio: "16:9",
        bigPlayButton: false,
        // height: this.height,
        // width: '100%',
        // height: 500,
        preload: "auto",
        autoplay,
        muted: this.muted,
        language: "zh",
        playbackRates: [],
        poster: this.poster,
        sources: [
          {
            type,
            src
          }
        ],
        // sources: [
        //   {
        //     // src: "rtmp://120.77.78.199:1935/hls/test"
        //     type: 'video/x-flv',
        //     src: this.src, // '/hls/test.m3u8'
        //     // src: "https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm"
        //     // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        //   },
        //   {
        //     src: '/live/av0.m3u8'
        //   }
        // ]
      };
    }
  }
};
</script>
<style lang="scss" scoped></style>
