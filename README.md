log4js
======
【目的】

本代码主要是给console的各个日志方法设置一个级别，满足指定级别的日志才会输出到控制台上。

涉及到的方法有：
              （1）console.debug
              （2）console.info
              （3）console.log
              （4）console.warn
              （5）console.error

【使用方法】

在页面上引入了log4js.js后，就可以调用

LogUtil.setLogLevel("xxx");  来设置log的级别。

xxx的值有

"all","debug","info","log","warn","error","none"

【说明】

设置 all 级别后，（1）（2）（3）（4）（5）都会输出。

设置 none 级别后，（1）（2）（3）（4）（5）都不会输出。

设置 debug 级别后，（1）（2）（3）（4）（5）都会输出。

设置 info 级别后，（2）（3）（4）（5）会输出，（1）不会输出。

设置 log 级别后， （3）（4）（5）会输出，（1）（2）不会输出。

设置 warn 级别后， （4）（5）会输出，（1）（2）（3）不会输出。

设置 error 级别后， （5）会输出，（1）（2）（3）（4）不会输出。

