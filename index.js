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
     * 转换成货币格式
     */
    function moneyFormat(s, symbol) {
        if (symbol === void 0) { symbol = "¥"; }
        if (!s)
            s = 0;
        s = s.toString();
        if (/[^0-9.]/.test(s))
            return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return symbol + s.replace(/^\./, "0.");
    }
    js_utils.moneyFormat = moneyFormat;
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
    /**
     * 将对象转换为Http请求的form表单数据
     * @param obj
     */
    function getFormWithObject(obj, except) {
        if (except === void 0) { except = []; }
        var fData = new FormData();
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!except.includes(key) && obj[key] !== undefined && obj[key] !== null) {
                fData.append(key, obj[key]);
            }
        }
        return fData;
    }
    js_utils.getFormWithObject = getFormWithObject;
    /**
     * 去掉空属性/空符串，并返回一个新对象
     */
    function objectRemoveNull(obj, except) {
        if (except === void 0) { except = [undefined, null, ""]; }
        var result = {};
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var c = _a[_i];
            if (!except.includes(obj[c])) {
                result[c] = obj[c];
            }
        }
        return result;
    }
    js_utils.objectRemoveNull = objectRemoveNull;
    /**
     * Check if an element has a class
     * @param {HTMLElement} elm
     * @param {string} cls
     * @returns {boolean}
     */
    function hasClass(ele, cls) {
        return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }
    js_utils.hasClass = hasClass;
    /**
     * Add class to element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    function addClass(ele, cls) {
        if (!hasClass(ele, cls))
            ele.className += " " + cls;
    }
    js_utils.addClass = addClass;
    /**
     * Remove class from element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            ele.className = ele.className.replace(reg, " ");
        }
    }
    js_utils.removeClass = removeClass;
})(js_utils = exports.js_utils || (exports.js_utils = {}));
