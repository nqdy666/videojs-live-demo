export const isWeixin = ((function () { //判断是否是微信
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
})());

export const isIOS = ((function () { //判断是否是iOS
  return navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)
})());

export const isANDROID = ((function () { //判断是否是Android
  return navigator.userAgent.match(/android/i)
})());
