<template>
  <div class="video-player" v-if="reseted">
    <video
      :id="id"
      class="video-js"
      ref="video"
      data-setup="{}"
      x5-video-player-fullscreen="true"
      playsinline
      webkit-playsinline
      x5-playsinline
      @touchstart="onTouchstart($event)"
      :x5-video-player-type="xVideoPlayerType"
    ></video>
  </div>
</template>

<script>
// lib
// import _videojs from 'video.js'
// const videojs = window.videojs || _videojs
const videojs = window.videojs;
import { isWeixin, isQQBrowser } from './util'

function autoPlayAudio(video) {
  if (window.WeixinJSBridge) {
    WeixinJSBridge.invoke(
      "getNetworkType",
      {},
      function(e) {
        video.play();
      },
      false
    );
  } else {
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
          video.play();
        });
      },
      false
    );
  }
  video.play();
  return false;
}

// as of videojs 6.6.0
const DEFAULT_EVENTS = [
  "loadeddata",
  "canplay",
  "canplaythrough",
  "play",
  "pause",
  "waiting",
  "playing",
  "ended",
  "error"
];
// export
export default {
  name: "video-player",
  props: {
    start: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: String(new Date().getTime())
    },
    crossOrigin: {
      type: String,
      default: ""
    },
    playsinline: {
      type: Boolean,
      default: false
    },
    customEventName: {
      type: String,
      default: "statechanged"
    },
    options: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({
        // autoplay: false,
        // controls: true,
        // // preload: 'auto',
        // // fluid: false,
        // // muted: false,
        // controlBar: {
        //   remainingTimeDisplay: false,
        //   playToggle: {},
        //   progressControl: {},
        //   fullscreenToggle: {},
        //   volumeMenuButton: {
        //     inline: false,
        //     vertical: true
        //   }
        // },
        // techOrder: ['html5'],
        // plugins: {}
      })
    },
    globalEvents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      player: null,
      xVideoPlayerType: isQQBrowser ? '' : 'h5',
      reseted: true
    };
  },
  mounted() {
    if (!this.player) {
      this.initialize();
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose();
    }
  },
  methods: {
    onTouchstart (e) {
      this.$emit('vidoe-touchstart', e)
    },
    initialize() {
      // videojs options
      const videoOptions = Object.assign({}, this.globalOptions, this.options);
      // ios fullscreen
      if (this.playsinline) {
        // this.$refs.video.setAttribute('playsinline', this.playsinline)
        // this.$refs.video.setAttribute('webkit-playsinline', this.playsinline)
        // this.$refs.video.setAttribute('x5-playsinline', this.playsinline)
        // this.$refs.video.setAttribute('x5-video-player-type', 'h5')
        // this.$refs.video.setAttribute('x5-video-player-fullscreen', false)
      }
      // cross origin
      if (this.crossOrigin !== "") {
        this.$refs.video.crossOrigin = this.crossOrigin;
        this.$refs.video.setAttribute("crossOrigin", this.crossOrigin);
      }
      // emit event
      const emitPlayerState = (event, value) => {
        if (event) {
          this.$emit(event, this.player);
        }
        if (value) {
          this.$emit(this.customEventName, { [event]: value });
        }
      };
      // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__;
      }
      // videoOptions
      // console.log('videoOptions', videoOptions)

      // player
      const self = this;
      this.player = videojs(this.$refs.video, videoOptions, function() {
        // events
        const events = DEFAULT_EVENTS.concat(self.events).concat(
          self.globalEvents
        );
        // watch events
        const onEdEvents = {};
        for (let i = 0; i < events.length; i++) {
          if (
            typeof events[i] === "string" &&
            onEdEvents[events[i]] === undefined
          ) {
            (event => {
              onEdEvents[event] = null;
              this.on(event, () => {
                emitPlayerState(event, true);
              });
            })(events[i]);
          }
        }
        // watch timeupdate
        this.on("timeupdate", function() {
          emitPlayerState("timeupdate", this.currentTime());
        });
        if (videoOptions.autoplay && isWeixin) {
          autoPlayAudio(this)
        }
        // player readied
        self.$emit("ready", this);
      });
    },
    dispose(callback) {
      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== "Flash") {
          this.player.pause && this.player.pause();
        }
        this.player.dispose();
        this.player = null;
        this.$nextTick(() => {
          this.reseted = false;
          this.$nextTick(() => {
            this.reseted = true;
            this.$nextTick(() => {
              callback && callback();
            });
          });
        });
        /*
          if (!this.$el.children.length) {
            const video = document.createElement('video')
            video.className = 'video-js'
            this.$el.appendChild(video)
          }
          */
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize();
          }
        });
      }
    }
  }
};
</script>
<style>
.vjs-custom-skin {
  height: 100%;
  width: 100%;
}
.vjs-custom-skin video:focus,
.vjs-custom-skin video:active {
  outline: none;
}

.vjs-custom-skin > .video-js {
  width: 100%;
  height: 100%;
  font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI",
    "Microsoft YaHei", "微软雅黑", sans-serif;
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline.vjs-slider-active,
.vjs-custom-skin > .video-js .vjs-menu-button-inline:focus,
.vjs-custom-skin > .video-js .vjs-menu-button-inline:hover,
.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em;
}

.vjs-custom-skin > .video-js .vjs-controls-disabled .vjs-big-play-button {
  display: none !important;
}

.vjs-custom-skin > .video-js .vjs-control {
  width: 3em;
}

.vjs-custom-skin > .video-js .vjs-control.vjs-live-control {
  width: auto;
  padding-left: 0.5em;
  letter-spacing: 0.1em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline:before {
  width: 1.5em;
}

.vjs-menu-button-inline .vjs-menu {
  left: 3em;
}

.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button,
.video-js.vjs-ended .vjs-big-play-button,
.video-js.vjs-paused .vjs-big-play-button {
  display: block;
}

.vjs-custom-skin > .video-js .vjs-load-progress div,
.vjs-seeking .vjs-big-play-button,
.vjs-waiting .vjs-big-play-button {
  display: none !important;
}

.vjs-custom-skin > .video-js .vjs-mouse-display:after,
.vjs-custom-skin > .video-js .vjs-play-progress:after {
  padding: 0 0.4em 0.3em;
}

.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}

.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}

.video-js.vjs-ended .vjs-big-play-button,
.video-js.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button {
  display: block;
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em;
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3.5em;
  /*border-radius: 50%;*/
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
}

.video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus,
.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: rgba(36, 131, 213, 0.9);
}

.vjs-custom-skin > .video-js .vjs-loading-spinner {
  border-color: rgba(36, 131, 213, 0.8);
}

.vjs-custom-skin > .video-js .vjs-control-bar2 {
  background-color: #000000;
}

.vjs-custom-skin > .video-js .vjs-control-bar {
  /*background-color: rgba(0,0,0,0.3) !important;*/
  color: #ffffff;
  font-size: 14px;
}

.vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  background-color: #2483d5;
}

.vjs-custom-skin > .video-js .vjs-play-progress:before {
  top: -0.3em;
}

.vjs-custom-skin > .video-js .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.3em;
}

.vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0em;
}

.vjs-custom-skin > .video-js .vjs-menu li {
  padding: 0;
  line-height: 2em;
  font-size: 1.1em;
  font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI",
    "Microsoft YaHei", "微软雅黑", sans-serif;
}

.vjs-custom-skin > .video-js .vjs-time-tooltip,
.vjs-custom-skin > .video-js .vjs-mouse-display:after,
.vjs-custom-skin > .video-js .vjs-play-progress:after {
  border-radius: 0;
  font-size: 1em;
  padding: 0;
  width: 3em;
  height: 1.5em;
  line-height: 1.5em;
  top: -3em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-popup .vjs-menu {
  width: 5em;
  left: -1em;
}

.vjs-custom-skin
  > .video-js
  .vjs-menu-button-popup.vjs-volume-menu-button-vertical
  .vjs-menu {
  left: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-menu {
  /*order: 4;*/
}

/*排序顺序*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
  order: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
  min-width: 1em;
  padding: 0;
  margin: 0 0.1em;
  text-align: center;
  display: block;
  order: 1;
}

.vjs-custom-skin
  > .video-js
  .vjs-control-bar
  .vjs-playback-rate
  .vjs-playback-rate-value {
  font-size: 1.2em;
  line-height: 2.4;
}

.vjs-custom-skin > .video-js .vjs-progress-control.vjs-control {
  order: 2;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-volume-menu-button {
  order: 3;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button {
  order: 4;
}

.vjs-custom-skin
  > .video-js
  .vjs-control-bar
  .vjs-resolution-button
  .vjs-resolution-button-label {
  display: block;
  line-height: 3em;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
  order: 5;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
  order: 6;
}
</style>
