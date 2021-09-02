/**
 * 装饰函数的装饰器
 * 大概率是基于原有的函数， 在不修改使用的时候， 通过装饰器的写法， 去修改原有的函数的逻辑
 * @param target
 * @param name
 * @param descriptor
 */

export function measure (target: any, name: any, descriptor: any) {
  const oldValue = descriptor.value;

  descriptor.value = async function () {
    const start = Date.now();
    const res = await oldValue.apply(this, arguments);
    console.log(`${name}执行时间${Date.now() - start}ms`);
  }

  return descriptor;
}
