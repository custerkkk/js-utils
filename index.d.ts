export declare module js_utils {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    function dateFormat(d: Date, fmt: string): string;
    /**
     * 获取URL参数
     * @param value
     */
    function getQueryVariable(value: string): string | null;
    /**
     * 如果source和data中存在相同的key, 将data中的值复制到source
     * @param source
     * @param data
     */
    function assign(source: any, data: any): void;
    /**
     * 获取UUID
     */
    function generateUUID(): string;
    /**
     * 是否为移动设备
     */
    function isMobile(): RegExpMatchArray | null;
    /**
     * 检测是否为json
     * @param str
     */
    function isJsonString(str: string): boolean;
    /**
     * json字符串转对象
     * @param str
     */
    function jsonToObject(str: string): any;
    /**
     * 将对象或者字符串转换为json字符串
     * @param value
     */
    function jsonStringify(value: any): string;
}
