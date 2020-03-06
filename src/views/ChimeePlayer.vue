<template>
  <div :id="id" class="chimee-player"></div>
</template>
<script>
// import ChimeePlayer from 'chimee-player';

export default {
  props: {
    id: {
      type: String
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    new ChimeePlayer({
      wrapper: "#" + this.id, // video dom容器
      // src: 'http://chimee.org/vod/1.mp4',
      // autoplay: true,
      // controls: true,
      src: "/live/teacher.m3u8",
      box: "native",
      isLive: true,
      autoplay: true,
      controls: true,
      playsInline: true,
      preload: true,
      x5VideoPlayerFullscreen: false,
      x5VideoOrientation: false,
      xWebkitAirplay: true,
      ...this.options
    });
  }
};
</script>
<style lang="scss">
.chimee-player {
  // position: relative;
  display: block;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #000;
    pointer-events: none;
  }
  video:focus,
  video:active {
    outline: none;
  }
}
</style>
