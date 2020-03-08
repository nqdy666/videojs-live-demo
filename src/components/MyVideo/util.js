export const isWeixin = ((function () { //判断是否是微信
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
})());

export function opSystemType () {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //判断是否是iOS
    return 'IOS'
  }
  if (navigator.userAgent.match(/android/i)) { //判断是否是Android
    return 'ANDROID'
  }
  return ''
}

