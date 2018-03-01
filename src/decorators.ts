/**
 * @File   : decorators.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 * @Date   : 2018-3-1 10:34:07
 */

export function once(privateKey?: string | symbol | undefined) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let getter = descriptor.get;
        if (!privateKey) {
            privateKey = Symbol(propertyKey);
        }

        descriptor.get = function() {
            return (this[privateKey] = this[privateKey] || getter.call(this));
        };
    };
}
