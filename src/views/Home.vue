<template>
  <div class="home">
    <my-video
      id="vidoe1"
      ref="video1"
      class="zhibo-video"
      :flvSrc="flvSrc1"
      :hlsSrc="hlsSrc1"
      :muted="smallVideo === 'video1'"
      :poster="video1Poster"
      :class="{ 'small-video': smallVideo === 'video1' }"
      @click="handleClick('video1')"
      @ready="handleVideo1Ready"
    ></my-video>
    <my-video
      id="vidoe2"
      ref="video2"
      class="zhibo-video"
      :flvSrc="flvSrc2"
      :hlsSrc="hlsSrc2"
      :muted="smallVideo === 'video2'"
       :poster="video2Poster"
      v-if="showVideo2"
      :class="{ 'small-video': smallVideo === 'video2' }"
      @click="handleClick('video2')"
      @ready="handleVideo2Ready"
    ></my-video>
  </div>
</template>

<script>
import MyVideo from "../components/MyVideo";
import { isWeixin } from "../components/MyVideo/util";

export default {
  name: "home",
  components: {
    MyVideo
  },
  data() {
    return {
      showVideo1: true,
      showVideo2: !isWeixin,
      video1Poster: '/poster1.jpg', // /poster1.jpg
      video2Poster: '/poster2.jpg', // /poster2.jpg
      smallVideo: "video1",
      flvSrc1: '/flv?port=1935&app=hls&stream=test',
      hlsSrc1: '/hls/test.m3u8',
      flvSrc2: '/flv?port=1935&app=hls&stream=test',
      hlsSrc2: '/hls/test.m3u8',
      // sources1: "/hls/test.m3u8", // /flv?port=1935&app=hls&stream=test
      // sources2: "/hls/test.m3u8" // /movie.mp4
      // sources1: [{
      //   type: 'video/x-flv',
      //   src: '/live/av0.flv', // '/hls/test.m3u8'
      // }, {
      //   src: '/live/av0.m3u8'
      // }],
      // sources2: [{
      //   type: 'video/x-flv',
      //   src: '/live/teacher.flv', // '/hls/test.m3u8'
      // }, {
      //   src: '/live/teacher.m3u8'
      // }]
    };
  },
  mounted() {},
  methods: {
    handleClick(type) {
      if (type !== this.smallVideo) return;
      if (this.smallVideo === "video1") {
        this.smallVideo = "video2";
      } else {
        this.smallVideo = "video1";
      }
    },
    handleVideo1Ready() {
      setTimeout(() => {
        this.showVideo2 = true;
      }, 4 * 1000); // 2秒延时
    },
    handleVideo2Ready() {}
  }
};
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
    height: 150px;
    z-index: 1;
  }

  @media screen and (min-width: 600px) {
    .small-video {
      left: unset;
      top: unset;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>
