const cacheMap = new Map();

export function EnableCache(target: any, name: string, descriptor) {
  const val = descriptor.value;

  descriptor.value = async function (...args: any) {
    const cacheKey = name + JSON.stringify(args);

    if (!cacheMap.get(cacheKey)) {
      const cacheVale = Promise.resolve(val.apply(this, args)).catch(_ => {
        cacheMap.set(cacheKey, null);
      });

      cacheMap.set(cacheKey, cacheVale);
    }

    return cacheMap.get(cacheKey);
  };

  return descriptor;
}

class Test {
  @EnableCache
  public getInfo() {
    return axios.get('/info');
  }
}