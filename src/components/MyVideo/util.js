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

export const isUC = ((function () { //判断是否是UC浏览器
  return navigator.userAgent.indexOf('UCBrowser') > -1
})());

export const isQQBrowser = ((function () { //判断是否是手机QQ浏览器
  return navigator.userAgent.indexOf('MQQBrowser') > -1
})());

export const isIE11 = ((function () { // 判断IE11
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if(isIE11){
		return true;
	}
	return false;
})());
