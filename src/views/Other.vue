<template>
  <div>
    <p>{{ userAgent }}</p>
    <button ref="copyButton" :data-clipboard-text="userAgent"></button>
  </div>
</template>
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
