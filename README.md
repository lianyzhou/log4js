logutil
======
【目标】
本代码主要是给console的各个日志方法设置一个级别，满足指定级别的日志才会输出到控制台上。

涉及到的方法有： （1）console.debug （2）console.info （3）console.log （4）console.warn （5）console.error

【使用方法】

(1)在页面上引入了logutil.js后，就可以调用

LogUtil.setLogLevel("xxx"); 来设置log的级别。

LogUtil是window上的全局变量。

xxx的值有

"all","debug","info","log","warn","error","none"

(2)为了方便项目进行调试，支持在页面URL上面使用参数的形式设置log级别。

例如 ：

  http://1ocalhost:8080/index.html?_loglevel=error
  http://1ocalhost:8080/index.html?page=3&_loglevel=error
  http://localhost:8080/index.html#list?_loglevel=warn
  http://localhost:8080/index.html#list?page=3&_loglevel=warn

参数为_loglevel,值为"all","debug","info","log","warn","error","none"其中的一个。

【说明】

设置 all 级别后，（1）（2）（3）（4）（5）都会输出。

设置 none 级别后，（1）（2）（3）（4）（5）都不会输出。

设置 debug 级别后，（1）（2）（3）（4）（5）都会输出。

设置 info 级别后，（2）（3）（4）（5）会输出，（1）不会输出。

设置 log 级别后， （3）（4）（5）会输出，（1）（2）不会输出。

设置 warn 级别后， （4）（5）会输出，（1）（2）（3）不会输出。

设置 error 级别后， （5）会输出，（1）（2）（3）（4）不会输出。

【特殊说明】
载入脚本后，默认的log级别是none。即全部log都不输出。如果需要输出，请自行设置。

当设置的log级别不是"all","debug","info","log","warn","error","none"中的任意一个时，会被当做none来处理。即全部日志都不会输出到控制台上。
