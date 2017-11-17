/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

// 对象判断
export function isObject(obj) {
    let type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

// 空判断
export function isEmpty(obj) {
    if (obj === null || obj === undefined) return true;
    if (isArrayLike(obj) && (isArray(obj) || isString(obj))) return obj.length === 0;
    if(isObject(obj)) return JSON.stringify(obj) === '{}';
    return false;
}

// 类数组判断
export function isArrayLike(obj) {
    if(typeof obj !== 'object' || !obj) {
        return false;
    }
    let length = obj.length;
    return typeof length === 'number' && length % 1 === 0 && length >= 0 && length <= MAX_ARRAY_INDEX;
};

export function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
}


export function get(obj, accessor) {
    let ret = undefined;
    if (!isObject(obj)) {
        return obj;
    }
    if (accessor == undefined) {
        return obj;
    }
    if (typeof accessor === 'string') {
        accessor = accessor.split('.');
        ret = obj;
        try {
            for (let i = 0; i < accessor.length; i++) {
                ret = ret[accessor[i]];
            }
        } catch (e) {
            ret = undefined;
        }
    } else if (typeof accessor === 'function') {
        ret = accessor(obj);
    }
    return ret;
};

export function deprecated(filter, msg) {
    console.warn('[filter - ' + filter + ']:this filter has deprecated, it will be remove at next minor version. ' + msg);
};

export function type(filter, input, type) {
    console.warn('[filter - ' + filter + ']: expect input type is :' + type + 'but got ' + typeof input);
};