export declare module js_utils {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    function dateFormat(d: Date, fmt: string): string;
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
