import {isFunction} from 'lodash';

const callFunc = (func, ...args) => (isFunction(func) ? func(...args) : func);

export default callFunc;
