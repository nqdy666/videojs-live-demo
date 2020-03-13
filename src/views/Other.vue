<template>
  <div>
    <div>
      <p>{{ userAgent }}</p>
      <button ref="copyButton" :data-clipboard-text="userAgent">复制UserAgent</button>
    </div>
    <!-- <iframe style="width: 100%;height: calc(100% - 45px);" frameborder="no" border="0" scrolling="yes" src="https://www.baidu.com"></iframe> -->
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      userAgent: navigator.userAgent
    };
  },
  methods: {
    initClipboard() {
      const clipboard = new Clipboard(this.$refs.copyButton);
      clipboard.on("success", e => {
        alert('复制成功')
      });
      clipboard.on("error", e => {
        alert('复制失败')
      });
    }
  },
  mounted() {
    this.initClipboard();
  }
};
</script>
<style lang="scss" scoped></style>
