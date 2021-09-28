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
})(js_utils = exports.js_utils || (exports.js_utils = {}));
