module.exports = {
  devServer: {
    proxy: {
      '/hls': {
        target: 'http://localhost:8090',
      },
      '/flv': {
        target: 'http://localhost:8090',
      },
      '/live': {
        target: 'http://172.29.4.102:8080'
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
