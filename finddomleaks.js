//获取所有dom绑定的事件
(function(window) {

var sourceCodeLen = 100;
var splice = Array.prototype.splice;
var consoleLog = console.log;

var getEventListenersPromptCount = 0;

function buildItem(obj) {
    var ret = [];
    ret.push(obj.dom);
    ret.push('绑定了' + obj.type + '事件');
    ret.push(obj.count + '个');
    return ret;
}
 
function getMore(obj) {
    var list = obj.evtList;
    var ret = [];
    for(var i = 0 , len = list.length ; i < len ; i++) {
        var item = [];
        var info = list[i];
        var ns = info.namespace;
        var selector = info.selector;
        var handler = (info.handler || info.listener);
        if(ns) {
            item.push('namespace:' + ns);
        } 
        if(selector) {
            item.push('selector:' + selector);
        }
        if(handler) {
            item.push('source:' + handler.toString());
            item.push(handler);
        }
        ret.push(item);
    }
    return ret;
}
 
function getJqueryEvent(dom) {
    var evtMap = {};
    var elemData = $._data(dom);
    if(elemData && elemData.events) {
        $(elemData.events).each(function(t , domAllEvtMap) {
             
            for(var evtType in domAllEvtMap) {
                var evtList = domAllEvtMap[evtType];
                $(evtList).each(function(i , evtObj) {
                    var origType =  evtObj.origType;
                    !evtMap[origType] && (evtMap[origType] = []);
                    evtMap[origType].push(evtObj);
                });
            }
        });
    }
    return evtMap;
}
 
function findDomLeaks(evtCount) {
    evtCount = evtCount || 1;
    if(typeof cmd_getEventListeners !== 'function' && getEventListenersPromptCount++ < 1 && window.chrome) {
        console.log('please run this from console ------------------------------------------------------------------');
        console.log('window.cmd_getEventListeners = (function() {\n\
            return getEventListeners;\n\
        })();');
        return; 
    }
    var sortList = [];
    var allDoms = $('*').get();
    allDoms.unshift(document);
    allDoms.unshift(window);
    allDoms = $(allDoms);
    allDoms.each(function(i,dom) {
        //获取jquery的事件
        var elemEvtMaps = getJqueryEvent(dom);
        //获取getEventListeners的所有事件
        if(typeof cmd_getEventListeners === 'function') {
            var allEvts = cmd_getEventListeners(dom);
            //遍历事件，添加去除jquery以外的事件
            for(evtType in allEvts) {
                var evtList = allEvts[evtType].slice();
                var jqEvtIdx = -1;
                $(evtList).each(function(j , obj) {
                    var source = obj.listener.toString();
                    if(source.indexOf('.event.dispatch') >= 0) {
                        jqEvtIdx = i;
                        return false;
                    }
                });
                if(jqEvtIdx >= 0) {
                    evtList.splice(jqEvtIdx , 1);
                }
                !elemEvtMaps[evtType] && (elemEvtMaps[evtType] = []);
                elemEvtMaps[evtType] = elemEvtMaps[evtType].concat(evtList);
            }   
        }
        //遍历elemEvtMaps添加到sortList中
        for(var type in elemEvtMaps) {
            sortList.push({
                type : type ,
                dom : dom , 
                count : elemEvtMaps[type].length,
                evtList : elemEvtMaps[type]
            });
        }
    }); 
    sortList.sort(function(obj1 , obj2) {
        return obj2.count - obj1.count;
    });
    for(var i = 0 , len = sortList.length ; i < len ; i++) {
        if(sortList[i].count >= evtCount) {
            var ret = buildItem(sortList[i]);
            console.log(ret);
            var more = getMore(sortList[i]);
            console.dir(more);
        }
    }
}
 
window.findDomLeaks = findDomLeaks;

findDomLeaks();

})(window);
