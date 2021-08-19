# Vue 高级使用

> 本节课程的主要内容比较简单，大致给大家介绍一部分 `Vue` 的高级使用案例
> 然后灵活使用课程中的部分技巧或能力，玩儿一个很骚的东西...

## 混入

> [官方文档](https://cn.vuejs.org/v2/guide/mixins.html)

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

本质上还是解决复用的问题，某种程度上类似 `React` 在 `Hooks` 没出来之前的 `HOC` 方案

> HOC 是代理了目标组件的 props 或者实例方案，然后还是要做一层 mixins 的处理，这是这部分工作量得自己完成，Vue 则是底层已经处理了，这也是 Vue 的一大特点，很多东西都默默的给你弄好了，React 则需要你自己动手，丰衣足食

**思考这里的设计**

## 插件

> [官方文档](https://cn.vuejs.org/v2/guide/plugins.html)

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin) // 这个必须在 new Vue 之前使用，为什么？

new Vue({
  // ...组件选项
})
```

如官方文档所说，插件的目的是提供全局的功能，比如路由，工具方法等

**思考这里的设计**

