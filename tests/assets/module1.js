/*jslint esnext: true*/
import {foo} from 'module2';
import something from 'module3';
import {foo as yui} from 'module4';

var asdf = 'asdf';

export var bar = 'bar', baz = 'baz';
export function hello() {}
export {asdf, asdf as qwer};
export default asdf;
