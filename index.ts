export module js_utils {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    export function dateFormat(d: Date, fmt: string): string {
        var o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            S: d.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                // @ts-ignore
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    }

    /**
     * 转换成货币格式
     */
    export function moneyFormat(s: any, symbol: string = "¥"): string {
        if (!s) s = 0;
        s = s.toString();
        if (/[^0-9.]/.test(s)) return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        const re = /(\d)(\d{3},)/;
        while (re.test(s)) s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return symbol + s.replace(/^\./, "0.");
    }

    /**
     * 获取URL参数
     * @param value
     */
    export function getQueryVariable(value: string): string | null {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (const item of vars) {
            const idx = item.search("=");
            if (item.substring(0, idx) == value) {
                return item.substr(idx + 1);
            }
        }
        return null;
    }
    /**
     * 如果source和data中存在相同的key, 将data中的值复制到source
     * @param source
     * @param data
     */
    export function assign(source: any, data: any) {
        const keys = Object.keys(source);
        for (const key of keys) {
            if (data[key] || data[key] === 0) source[key] = data[key];
        }
    }

    /**
     * 获取UUID
     */
    export function generateUUID() {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    /**
     * 是否为移动设备
     */
    export function isMobile() {
        const flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
    }

    /**
     * 检测是否为json
     * @param str
     */
    export function isJsonString(str: string): boolean {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch (e) {
            console.log("not json");
        }
        return false;
    }
    /**
     * json字符串转对象
     * @param str
     */
    export function jsonToObject(str: string): any {
        try {
            var obj = eval("(" + str + ")");
            return obj;
        } catch (e) {
            return {};
        }
    }
    /**
     * 将对象或者字符串转换为json字符串
     * @param value
     */
    export function jsonStringify(value: any): string {
        if (typeof value == "string") {
            return JSON.stringify(JSON.parse(value));
        }
        return JSON.stringify(value);
    }

    /**
     * 将对象转换为Http请求的form表单数据
     * @param obj
     */
    export function getFormWithObject(obj: any, except: string[] = []) {
        const fData = new FormData();
        for (const key of Object.keys(obj)) {
            if (!except.includes(key) && obj[key] !== undefined && obj[key] !== null) {
                fData.append(key, obj[key]);
            }
        }
        return fData;
    }

    /**
     * 去掉空属性/空符串，并返回一个新对象
     */
    export function objectRemoveNull(obj: any, except: any[] = [undefined, null, ""]): any {
        const result: any = {};
        for (const c of Object.keys(obj)) {
            if (!except.includes(obj[c])) {
                result[c] = obj[c];
            }
        }
        return result;
    }

    /**
     * Check if an element has a class
     * @param {HTMLElement} elm
     * @param {string} cls
     * @returns {boolean}
     */
    export function hasClass(ele: HTMLElement, cls: string) {
        return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }

    /**
     * Add class to element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    export function addClass(ele: HTMLElement, cls: string) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }

    /**
     * Remove class from element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    export function removeClass(ele: HTMLElement, cls: string) {
        if (hasClass(ele, cls)) {
            const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            ele.className = ele.className.replace(reg, " ");
        }
    }
}
