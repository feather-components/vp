import { isArrayLike, type, rest } from '../util'

const base = {};

/**
 * @filter push, pop, shift, unshift
 * @description return a new array with those native array method. notice: those filter won't change origin array.
 * @example
 * ```
 * {{ [1,2,3] | push(4) }}  => [1,2,3,4]
 * {{ [1,2,3,4] | shift }}  => [2,3,4]
 * ```
 */
['push', 'pop', 'shift', 'unshift'].forEach(method => {
    base[method] = collection => {
        if(isArrayLike(collection)) {
            collection = Array.from(collection);
        }
        if(Array.isArray(collection)) {
            collection[method].apply(collection, rest(arguments));
            return collection;
        } else {
            type(collection, 'array');
            return collection;
        }
    };
});


/**
 * @filter slice, indexOf, concat, join
 * @description the same way with native array method.
 * @example
 * ```
 * {{ [1,2,3] | indexOf(2) }}  => 1
 * {{ [1,2] | concat([3,4]) }}  => [1,2,3,4]
 * {{ [1,2,3] | join('-) }} => '1-2-3'
 * {{ [1,2,3] | slice(1) }} => [2,3]
 * ```
 */
['slice', 'indexOf', 'concat', 'join'].forEach(method => {
    base[method] = collection => {
        if(!Array.isArray(collection)) {
            collection = Array.from(collection);
        }
        return collection[method].apply(collection, rest(arguments));
    };
});

export base;