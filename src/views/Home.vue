<template>
  <div class="home">
    <my-video
      id="vidoe1"
      ref="video1"
      :flvSrc="flvSrc1"
      :hlsSrc="hlsSrc1"
      :autoplay="true"
      :muted="smallVideo === 'video1'"
      v-if="showVideo1"
      :poster="video1Poster"
      :class="{ 'zhibo-video': !zhiboVideoFixedWh, 'zhibo-video-fixed-wh': zhiboVideoFixedWh, 'small-video': smallVideo === 'video1' }"
      @click="handleClick('video1', video1Playing)"
      @ready="handleVideo1Ready"
      @playing="handleVideo1Playing"
    ></my-video>
    <my-video
      id="vidoe2"
      ref="video2"
      :autoplay="true"
      :flvSrc="flvSrc2"
      :hlsSrc="hlsSrc2"
      :muted="smallVideo === 'video2'"
       :poster="video2Poster"
      v-if="showVideo2"
      :class="{ 'zhibo-video': !zhiboVideoFixedWh, 'zhibo-video-fixed-wh': zhiboVideoFixedWh, 'small-video': smallVideo === 'video2' }"
      @click="handleClick('video2', video2Playing)"
      @ready="handleVideo2Ready"
      @playing="handleVideo2Playing"
    >
    </my-video>
  </div>
</template>

<script>
import MyVideo from "../components/MyVideo";
import { isWeixin, isANDROID, isUC, isQQBrowser, isHuaweiMHA, isBaiduBoxapp, isOPPOBrowser, isWeixinQQBrowser } from "../components/MyVideo/util";

export default {
  name: "home",
  components: {
    MyVideo
  },
  data() {
    return {
      showVideo1: true, // 安卓的微信自动播放有问题，需要延迟
      showVideo2: true,
      video1Playing: false,
      video2Playing: false,
      video1Poster: '/poster1.jpg', // /poster1.jpg
      video2Poster: '/poster2.jpg', // /poster2.jpg
      smallVideo: "video1",
      
      flvSrc1: 'http://localhost:8090/flv?port=1935&app=hls&stream=video1',
      flvSrc2: 'http://localhost:8090/flv?port=1935&app=hls&stream=video2',
      hlsSrc1: 'http://localhost:8090/hls/video1.m3u8',
      hlsSrc2: 'http://localhost:8090/hls/video2.m3u8',
      // 当hls为空的时候，会选择flv播放
      // hlsSrc1: '',
      // hlsSrc2: '',
      // zhiboVideoFixedWh：这些机型的视频播放器并非使用web的video播放，而是自定义播放器，视频无法实现画中画效果，故做了一些特殊处理。
      zhiboVideoFixedWh: (isUC || isBaiduBoxapp || isQQBrowser || isHuaweiMHA || isOPPOBrowser),
    };
  },
  mounted() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  },
  beforeDestroy () {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  },
  methods: {
    handleOnline () {
      window.location.reload()
    },
    handleOffline () {
    },
    handleClick(type, playing) {
      if (!playing) return
      if (type !== this.smallVideo) return;
      if (this.smallVideo === "video1") {
        this.smallVideo = "video2";
      } else {
        this.smallVideo = "video1";
      }
    },
    handleVideo1Ready() {
    },
    handleVideo2Ready () {
    },
    handleVideo1Playing (val) {
      this.video1Playing = val
    },
    handleVideo2Playing (val) {
      this.video2Playing = val
    },
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background: black;

  .zhibo-video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .zhibo-video-fixed-wh {
    position: absolute;
    left: 0;
    top: 55%;
    transform: translateY(-50%);
    width: 100%;
    height: 300px;
  }

  .zhibo-video-fixed-wh.small-video {
    right: 0;
    left: unset;
    top: 0;
    transform: unset;
    width: 200px;
    height: 115px;
    z-index: 1;
  }

  @media screen and (min-width: 600px) {
    .zhibo-video-fixed-wh {
      left: 0;
      top: 0;
      transform: none;
      width: 70%;
      height: 100%;
    }
    .zhibo-video-fixed-wh.small-video {
      left: unset;
      top: unset;
      top: 50%;
      margin-top: -55px;
      width: 28%;
      height: 110px;
      right: 0;
    }
  }

  .small-video {
    right: 0;
    left: unset;
    top: 0;
    transform: unset;
    width: 200px;
    height: 115px;
    z-index: 1;
  }

  @media screen and (min-width: 600px) {
    .small-video {
      left: unset;
      top: unset;
      bottom: 0;
      right: 0;
    }
  }

  .video-error {
    // background: red;
    // width: 100%;
    // height: 100%;
  }
}
</style>
