<script>
// tree.vue - 大框架
import item from './item'
import refs from './refs.js'

let count = 0
export default {
  name: 'tree',

  // 传递参数
  props: {
    // 选中节点
    value: Array,
    // 树形结构
    options: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    let name = 'v_tree_' + ++count
    return {
      name
    }
  },

  // 同步实例状态
  created () {
    let name = this.name
    refs.init({
      name
    }, this)
  },
  destroy () {
    let name = this.name
    refs.destroy(
      name
    )
  },
  components: {
    item
  },

  render (h) {
    return (
      <div class="tree">
        <ul class="vue-tree">
          {
            this.options.map((itemData, index) => {
              return (
                <item name={this.name}
                  option={itemData}
                  key={`${this.name}${itemData['value']}${index}`}>
                </item>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
</script>
