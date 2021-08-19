<script>
// 节点处理 item.vue
import refs from './refs.js'

let count = 0

export default {
  name: 'item',
  data () {
    let cid = this.cid || (`item` + ++count)
    return {
      level: this.$parent.level || 0 + 1,
      indent: 1,
      expand: false,
      checked: false,
      cid
    }
  },
  props: {
    name: String,
    option: Object
  },
  computed: {
    // 是否有子节点
    isFolder () {
      return !!this.option['children']
    }
  },
  methods: {
    // 点击选中
    handleClickItem () {
      this.checked = !this.checked
    },

    // 点击展开
    handleClickExpand () {
      this.expand = !this.expand
    },

    // 恢复初始状态
    setDefault () {
      let tree = refs.get(this.name)
      let _value = tree.value

      if (_value.indexOf(this.option['value']) > -1) {
        this.checked = true
      }
    }
  },

  mounted () {
    let name = this.name

    refs.set(name, this)
    this.setDefault()
  },

  render (h) {
    return (
      <li class={[
        'tree_item',
        this.checked && 'is-checked'
      ]}>

        {/* 展开箭头 */}
        <div class={['arrow', this.expand ? 'expand' : '']} style={{display: this.isFolder ? 'block' : 'none'}}
          onClick={this.handleClickExpand}></div>

        {/* 展示标题 */}
        <a class={['v-tree__title']} style={{paddingLeft: this.level !== 0 && (`${this.level * this.indent}px`)}}
          onClick={this.handleClickItem}>
          { this.option['text'] }
        </a>

        {/* 子节点的嵌套 */}
        {
          this.isFolder &&
            <ul class="vue-tree__folder" style={{display: this.expand ? 'block' : 'none'}}>
              {
                this.option['children'].map((itemData, index) => {
                  return (
                    <item name={this.name}
                      option={itemData}
                      key={`${this.name}${itemData['value']}${index}`}>
                    </item>
                  )
                })
              }
            </ul>
        }
      </li>
    )
  }
}
</script>
<style scoped>
  .tree_item {
    cursor: pointer;
  }
  li {
    position: relative;
  }
  .v-tree__title {
    margin: 5px;
  }
  .arrow {
    position: absolute;
    left: -10px;
    top: 10px;
    width: 5px;
    height: 5px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    transform: rotate(-135deg);
  }
  .expand {
    transform: rotate(45deg);
  }
  .is-checked {
    color: blue;
  }
  ul, li {
    list-style: none;
  }
</style>
