module.exports = {
  devServer: {
    proxy: {
      '/hls': {
        target: 'http://localhost:8090',
      },
      '/flv': {
        target: 'http://localhost:8090',
      }
    }
  },
}
