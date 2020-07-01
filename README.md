# video-js-demo

video js 样例代码，支持hls和flv直播

### 效果图
![效果图](./docs/screen-shot.png)

### 特性
- 基于vue-cli@3工具生成
- 支持hls、flv直播
- 支持两路同时播放
- 支持大小视频点击切换

### 用到相关的库
- video-js@7.8.3
- flv@1.5.0
- videojs-flvjs@0.2.0
- videojs-hlsjs-plugin@1.0.14 (hls.js)

### 文档参考
- 【videojs】https://github.com/videojs/video.js
- 【videojs博客】https://blog.videojs.com/video-js-7-is-here/
- 【videojs参数相关】https://docs.videojs.com/tutorial-options.html
- 【vue-video-player】https://github.com/surmon-china/vue-video-player
- 【vue-video-player 例子】https://github.surmon.me/vue-video-player/
- 【直播RTMP服务器相关】 https://qjzd.net/topic/5e3bcf0bdcf06d6a181ffb7f
- 【hls.js 源码解读【1】】https://juejin.im/entry/5a02d0d2f265da43284049b0
- 【hls.js】https://github.com/video-dev/hls.js/
- 【videojs-hlsjs-plugin】https://github.com/streamroot/videojs-hlsjs-plugin
- 【flv.js】https://github.com/Bilibili/flv.js/

### 已知限制
具体看[WEB直播方案与浏览器兼容问题总结](docs/WEB直播方案与浏览器兼容问题总结.xlsx)

### 文档

[WEB直播方案与浏览器兼容问题总结](docs/WEB直播方案与浏览器兼容问题总结.xlsx)

### Demo代码相关
`src/views/Home.vue`文件中的`/hls/video1.m3u8`是直播的地址，根据实际情况修改，另外这个地址是通过最终代理访问的，代理的配置在`vue.config.js`文件中`proxy`配置，也请根据实际情况修改。

## 开始
```
npm install
```

### 开发
```
npm run dev
npm run serve
```

### 编译
```
npm run build
```

### 代码校验
```
npm run lint
```

### videojs 错误信息

播放m3u8，断网后会一直转圈圈，不会报错。


播放m3u8，引入了videojs-hlsjs-plugin@1.0.14后，断网后包这样子的错误
```
HLS.js error: networkError - fatal: true - manifestLoadError
```


