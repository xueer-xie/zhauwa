
const cacheMap = new Map();

export function EnableCache(target: any, name: string, descriptor: PropertyDescriptor) {
    const val = descriptor.value;
    descriptor.value = async function(...args: any) {
        // 函数名 + 参数来保证缓存key的唯一性
        const cacheKey = name + JSON.stringify(args);
        if (!cacheMap.get(cacheKey)) {
            // Promise.resolve将val执行结果强行包装为promise
            // 报错 catch的时候, 清空缓存. 下次重新执行
            const cacheValue = Promise.resolve(val.apply(this, args)).catch((_) => cacheMap.set(cacheKey, null));
            cacheMap.set(cacheKey, cacheValue);
        }
        return cacheMap.get(cacheKey);
    };
    return descriptor;
}
