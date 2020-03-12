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
  return navigator.userAgent.indexOf('MQQBrowser') > -1 && !isWeixin
})());

export const isXiaoMiBrowser = ((function () { //判断是否是小米浏览器
  return navigator.userAgent.indexOf('XiaoMi/MiuiBrowser') > -1
})());

export const isHuaweiBrowser = ((function () { //判断是否是华为,荣耀p20
  return navigator.userAgent.indexOf('HuaweiBrowser') > -1
})());

export const isHuaweiMHA = ((function () { //判断是否是华为,mate9
  return navigator.userAgent.indexOf('HUAWEIMHA-AL00') > -1
})());

export const isBaiduBoxapp = ((function () { //判断是否是Baidu浏览器
  return navigator.userAgent.indexOf('baiduboxapp') > -1
})());

export const isOPPOBrowser = ((function () { //判断是否是OPPO浏览器 OPPO R7s
  return navigator.userAgent.indexOf('OPPO') > -1
})());

export const isIE11 = ((function () { // 判断IE11
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if(isIE11){
		return true;
	}
	return false;
})());
