"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.js_utils = void 0;
var js_utils;
(function (js_utils) {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    function dateFormat(d, fmt) {
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            S: d.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                // @ts-ignore
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    }
    js_utils.dateFormat = dateFormat;
    /**
     * 获取URL参数
     * @param value
     */
    function getQueryVariable(value) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var _i = 0, vars_1 = vars; _i < vars_1.length; _i++) {
            var item = vars_1[_i];
            var idx = item.search("=");
            if (item.substring(0, idx) == value) {
                return item.substr(idx + 1);
            }
        }
        return null;
    }
    js_utils.getQueryVariable = getQueryVariable;
    /**
     * 如果source和data中存在相同的key, 将data中的值复制到source
     * @param source
     * @param data
     */
    function assign(source, data) {
        var keys = Object.keys(source);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (data[key] || data[key] === 0)
                source[key] = data[key];
        }
    }
    js_utils.assign = assign;
    /**
     * 获取UUID
     */
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }
    js_utils.generateUUID = generateUUID;
    /**
     * 是否为移动设备
     */
    function isMobile() {
        var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    }
    js_utils.isMobile = isMobile;
    /**
     * 检测是否为json
     * @param str
     */
    function isJsonString(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        }
        catch (e) {
            console.log("not json");
        }
        return false;
    }
    js_utils.isJsonString = isJsonString;
    /**
     * json字符串转对象
     * @param str
     */
    function jsonToObject(str) {
        try {
            var obj = eval("(" + str + ")");
            return obj;
        }
        catch (e) {
            return {};
        }
    }
    js_utils.jsonToObject = jsonToObject;
    /**
     * 将对象或者字符串转换为json字符串
     * @param value
     */
    function jsonStringify(value) {
        if (typeof value == "string") {
            return JSON.stringify(JSON.parse(value));
        }
        return JSON.stringify(value);
    }
    js_utils.jsonStringify = jsonStringify;
})(js_utils = exports.js_utils || (exports.js_utils = {}));
