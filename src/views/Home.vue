<template>
  <div class="home">
    <my-video ref="video1" class="zhibo-video" src="/hls/test.m3u8"
      :class="{'small-video': smallVideo === 'video1'}" @click="handleClick('video1')"></my-video>
    <my-video ref="video2" class="zhibo-video" src="/hls/test.m3u8"
      :class="{'small-video': smallVideo === 'video2'}" @click="handleClick('video2')"></my-video>
  </div>
</template>

<script>
import MyVideo from './MyVideo'

export default {
  name: 'home',
  components: {
    MyVideo,
  },
  data () {
    return {
      smallVideo: 'video1'
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
