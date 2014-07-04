(function(window) {
	
	//放到window全局变量上
	window.LogUtil = window.LogUtil || {};
	
	//oldMethodMap用来记录原有console的各个函数
	var oldMethodMap = {} , 
		//method_arr按照顺序优先级记下logLevel的程度
		//特意添加一个logLevel  none
		//none的时候所有log都不显示
		method_arr = ["log","debug","info","warn","error","none"] , 
		//默认log级别为none
		logLevel = "none";
	
	//检测level字符串不符合要求的时候默认为none
	function checkLevelStr(level) {
		if(method_arr.indexOf(level) < 0) {
			level = 'none';
		}
		return level;
	}
	
	//在LogUtil上添加setLogLevel
	window.LogUtil.setLogLevel = window.LogUtil.setLogLevel || function(level) {
		logLevel = checkLevelStr(level);
	};
	
	//在url上寻找_loglevel=xxx，作为初始化loglevel
	var href = window.location.href , 
		reg = /[?&#]_loglevel=([^&]+)/i;
	
	if(reg.test(href)) {
		logLevel = checkLevelStr(RegExp.$1);
	}
	//返回一个函数，覆盖掉默认的console.xxx
	function methodOveride(level) {
		return function() {
			var logLevelIdx = method_arr.indexOf(logLevel);
			var curLevelIdx = method_arr.indexOf(level);
			if(curLevelIdx >= logLevelIdx && oldMethodMap[level]) {
				oldMethodMap[level].apply(console , arguments);
			}
		};
	};
	
	//保存原始console.xxx
	//覆盖为新的console.xxx
	//添加try catch ,  避免浏览器不让覆盖console而报错。
	//一旦是这种情况，LogUtil.setLogLevel将没有什么效果，但不会影响应用的正常运行。
	try {
		var consoleObj = window.console || {};
		for(var i = 0 , len = method_arr.length ; i < len ; i++) {
			var methodName = method_arr[i];
			oldMethodMap[methodName] = consoleObj[methodName];
			consoleObj[methodName] = methodOveride(methodName);
		} 	
	} catch(e){}
	
	
	
})(window);
