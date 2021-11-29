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
    export function assign(source:any, data:any){
        const keys = Object.keys(source);
        for(const key of keys){
            if(data[key] || data[key] === 0) source[key] = data[key];
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
}
