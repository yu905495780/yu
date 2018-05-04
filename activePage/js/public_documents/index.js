/**
 * 后端接口地址
 * @type {string}
 */
apiUrl = 'https://api-dev.shenyuevip.com';
// apiUrl = 'https://api-t.shenyuevip.com';
// apiUrl = 'https://api.shenyuevip.com';
// apiUrl = 'http://39.106.138.193:8082';
/**
 * 静态资源文件地址
 * @type {string}
 */
avatarUrl = 'http://resource-dev.shenyuevip.com/';
// avatarUrl = 'http://resource-test.shenyuevip.com/';
// avatarUrl = 'http://resource.shenyuevip.com/';
// avatarUrl = 'http://sy-web.oss-cn-beijing.aliyuncs.com/';
// /**
//  * 后端接口地址
//  * @type {string}
//  */
// apiUrl = 'https://api-t.shenyuevip.com';
// /**
//  * 静态资源文件地址
//  * @type {string}
//  */
// avatarUrl = 'http://resource-test.shenyuevip.com/';
// /**
//  * 后端接口地址
//  * @type {string}
//  */
// apiUrl = 'https://api.shenyuevip.com';
// /**
//  * 静态资源文件地址
//  * @type {string}
//  */
// avatarUrl = 'http://resource.shenyuevip.com/';

/**
 * 用户id
 * @type {*}
 */
// var globalUid, globalToken, globalClientId;

/**
 * 机型：1、安卓；2、ios；
 * @type {number}
 */
// var type = show();


/**
 * 向移动端请求登录状态
 */
/*function getLoginStatus() {
    if (globalToken != undefined && globalToken != '') {
        isExitsCallBackAndAction();
        return;
    }
    if (type == 1) {
        var res = shenyue.jsGetToken();
        if (res != null && res != '') {
            var resAttr = res.split(':');
            globalUid = resAttr[0];
            globalClientId = resAttr[1];
            globalToken = resAttr[2];
            isExitsCallBackAndAction();
        }
    } else if (type == 2) {
        postMessageForIos({type: 3});
    }
}*/

/**
 * ajax全局设置
 */
/*$(document).ajaxSend(function (event, jqXHR, ajaxOptions) {

    /!*设置请求头token*!/
    setHeader(jqXHR);
    /!*设置公共参数uid和clientId*!/
    setParam(ajaxOptions);

});*/

/**
 * 设置token
 * @param jqXHR
 */
function setHeader(jqXHR) {
    jqXHR.setRequestHeader("Authorization", globalToken);
}

/**
 * 设置公共参数
 */
function setParam(ajaxOptions) {
    var pot = ajaxOptions.type;
    if (pot.toUpperCase() == 'POST') {
        var data = ajaxOptions.data;
        if (ajaxOptions.contentType.indexOf("x-www-form-urlencoded")) {
            if (data) {
                data += "&uid=" + globalUid + "&clientId=" + globalClientId;
            } else {
                ajaxOptions.data = "uid=" + globalUid + "&clientId=" + globalClientId;
            }
        } else if (ajaxOptions.contentType.indexOf("json")) {
            data.uid = globalUid;
            data.clientId = globalClientId;
        }
        ajaxOptions.data = data;
    } else if (pot.toUpperCase() == 'GET') {
        var url = ajaxOptions.url;
        if (url.indexOf("?") != -1) {
            url += "&uid=" + globalUid + "&clientId=" + globalClientId;
        } else {
            url += "?uid=" + globalUid + "&clientId=" + globalClientId;
        }
        ajaxOptions.url = url;
    }
}

/**
 * IOS回写登录状态
 * @param uid
 * @param clientId
 * @param token
 */
/*function jsGetToken(uid, clientId, token) {
    globalUid = uid;
    globalToken = token;
    globalClientId = clientId;
    isExitsCallBackAndAction();
}*/


/**
 * 解析url参数方法
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}


/**
 * 判断机型
 * @returns {number} 1: isAndroid; 2:isIOS;
 *//*
function show() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 1;
    }
    if (isIOS) {
        return 2;
    }
    return 0;
}*/

function buyGoldSuccess() {
    $('#gold').append("充值成功！");
}


/**
 * 调用ios
 * @param param
 */
/*function postMessageForIos(param) {
    window.webkit.messageHandlers.shenyue.postMessage(param);
}*/


/**
 * 跳转至移动端认证中心
 */
function jumpToAuthentication() {
    if (type == 1) {
        shenyue.toAuthentication();
    } else if (type == 2) {
        postMessageForIos({type: 4});
    }
}

/**
 * 跳转至金币充值
 */
function jumpToBuyGold() {
    if (type == 1) {
        shenyue.jsBuyGold();
    } else if (type == 2) {
        postMessageForIos({type: 1});
    }
}

/**
 * 跳转至分享
 */
function jumpToShare() {
    if (type == 1) {
        shenyue.jsShareActivity('分享', 'h5页面分享', 'www.baidu.com');
    } else if (type == 2) {
        postMessageForIos({
            type: 2,
            data: {title: '测试分享的标题', content: '测试分享的内容', url: 'www.baidu.com'}
        });
    }
}

/**
 * 判断方法是否存在
 * @param funcName
 * @returns {boolean}
 */
function isExitsCallBackAndAction() {
    try {
        if (typeof(eval("getTokenCallBack")) == "function") {
            getTokenCallBack();
        }
    } catch (e) {
    }
}

/**
 * 获取到登录状态时的回调
 * 业务需要登录状态时，向这里注册回调方法。
 */

/*$(function () {
    getLoginStatus();
});*/


