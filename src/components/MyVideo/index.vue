<template>
  <div class="m-video-wrapper">
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :events="events"
      cross-origin="anonymous"
      :options="playerOptions"
      @click.native="onTouchstart($event)"
      @touchstart="onTouchstart($event)"
      @vidoe-touchstart="onVidoeTouchstart($event)"
      @play="onPlayerPlay($event)"
      @error="onPlayerError($event)"
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
    >
    </video-player>
    <div class="m-video-error-page" v-show="videoError">
      <slot name="error">
        <div></div>
      </slot>
    </div>
  </div>
</template>
<script>
import videoPlayer from './VueVideoJsPlayer'
import { isWeixin, isIOS, isIE11, isANDROID, isUC, isQQBrowser, isXiaoMiBrowser, isBaiduBoxapp, isOPPOBrowser } from './util'

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
  },
  methods: {
    // https://github.com/videojs/video.js/issues/5403
    onTouchstart () {
      this.$emit('click')
    },
    onVidoeTouchstart () {
      if ((isUC) && isANDROID) {
        this.$emit('click')
      }
    },
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
      this.$emit('playing', false)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
      this.$emit('playing', true)
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
      this.player = player
      player.muted(this.muted)
      this.$emit('ready')
    },
    onPlayerError (player) {
      // player.errorDisplay.close();
      console.log('this.videoError', this.videoError)
      this.videoError = true
    }
  },
  beforeDestroy () {
  },
  data () {
    return {
      videoError: false,
      // userAgent: navigator.userAgent,
       events: [
        'touchstart'
      ]
    }
  },
  computed: {
    playerOptions() {
      let type = ''
      let src = this.hlsSrc
      // hlsSrc为空，直接用flvSrc。在只使用chrome场景有这方面需要
      if (!this.hlsSrc) {
        src = this.flvSrc
        type = 'video/x-flv'
      }
      if (isANDROID && isWeixin) {
        src = this.flvSrc
        type = 'video/x-flv'
      } else if (isXiaoMiBrowser) {
        src = this.flvSrc
        type = 'video/x-flv'
      } else if (isOPPOBrowser) {
        src = this.flvSrc
        type = 'video/x-flv'
      }
      let bigPlayButton = true
      // // safari需要大按钮，安卓微信需要大按钮
      // if ((isIOS && !isWeixin) || (isANDROID && isWeixin)) {
      //   bigPlayButton = true
      // }
      let autoplay = true
      // UC浏览器和QQ浏览器的video会被拦截，而且无法通过设置autoplay自动播放有问题
      if (isUC || isQQBrowser) {
        // autoplay = false
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
        // fluid: false,
        // // aspectRatio: "16:9",
        bigPlayButton,
        // width: '100%',
        preload: "auto",
        autoplay,
        muted: false,
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
  },
  watch: {
    muted () {
      this.player && (this.player.muted(this.muted))
    }
  }
};
</script>
<style lang="scss">
  .m-video-wrapper {
    position: relative;
  }
  .m-video-error-page {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
</style>
