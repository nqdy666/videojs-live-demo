<template>
  <div class="home">
    订单多111
    <!-- <my-video ref="video1" class="zhibo-video" type="video/x-flv" src="/live/av0.flv"
      :class="{'small-video': smallVideo === 'video1'}" @click="handleClick('video1')"></my-video> -->
      <!-- <my-video ref="video1" class="zhibo-video"  src="/hls/test.m3u8"
      :class="{'small-video': smallVideo === 'video1'}" @click="handleClick('video1')"></my-video> -->
    <!-- <my-video ref="video2" class="zhibo-video" src="/hls/test.m3u8" type=""
      :class="{'small-video': smallVideo === 'video2'}" @click="handleClick('video2')"></my-video> -->
      <!-- <my-video ref="video1" class="zhibo-video" src="/hls/test.m3u8" type="application/vnd.apple.mpegurl"
      :class="{'small-video': smallVideo === 'video1'}" @click="handleClick('video1')"></my-video> -->
    <!-- <my-video ref="video2" class="zhibo-video" src="/live/livestream.m3u8"
      :class="{'small-video': smallVideo === 'video2'}" @click="handleClick('video2')"></my-video> -->
    <!-- <my-video ref="video2" class="zhibo-video" type="video/x-flv" src="video/x-flv" src="/live/av0.flv"
    :class="{'small-video': smallVideo === 'video2'}" @click="handleClick('video2')"></my-video> -->
    <!-- <video src="https://www.w3school.com.cn/i/movie.ogg" controls="controls"></video> -->
    <!-- <video class="zhibo-video" autoplay controls autobuffer type="application/vnd.apple.mpegurl" x5-video-player-fullscreen="false"
      src="/hls/test.m3u8"> </video>-->
    
  
  <video class="small-video" autoplay controls autobuffer type="application/vnd.apple.mpegurl"
    src="/hls/test.m3u8"></video>
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
      smallVideo: 'video1',
      src: ''
    }
  },
  mounted () {
    // alert(TcPlayer)
    // var player = new TcPlayer('id_test_video', {
    //   "m3u8": "/hls/test.m3u8", //请替换成实际可用的播放地址
    //   "autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
    //   "poster" : "http://www.test.com/myimage.jpg",
    //   "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
    //   "height" : '320'//视频的显示高度，请尽量使用视频分辨率高度
    //   });
    setTimeout(() => {
      this.src = '/hls/test.m3u8'
    }, 2 * 1000)
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
    top: 400px;
    width: 300px;
    height: 300px;
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
