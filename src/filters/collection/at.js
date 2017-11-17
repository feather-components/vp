/**
 * @filter at
 * @description Return the item at the specified index in an array or a string.
 * @example
 * ```
 * {{ ['a','b','c'] | at(1) }} => 'b'
 * {{ 'hello' | at(0) }} => 'h'
 * {{ 'js' | at(10) }} => undefined
 * ```
 */

export default function at(collection, index) {
    if(Array.isArray(collection) || typeof collection === 'string'){
        return collection[+index];
    }
    return ;
}
