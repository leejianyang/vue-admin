<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      @click="handleClick"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  props: {
    theme: {
      type: String,
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  watch: {
    // url 发生变化后，改变菜单导航栏高亮选择的菜单和菜单折叠情况
    '$route.path': function(path) {
      this.selectedKeys = [path]
      this.openKeys = [this.openKeysMap[path]]
    }
  },
  data() {
    this.openKeysMap = {}
    const menuList = this.getMenuList()
    return {
      list: menuList,
      selectedKeys: [this.$route.path],
      openKeysMap: this.openKeysMap,
      openKeys: [this.openKeysMap[this.$route.path]],
    }
  },
  methods: {
    // 点击菜单项后，路由跳转
    handleClick({key}) {
      if (key !== this.$route.path) {
        this.$router.push({ path: key, query: this.$route.query })
      }
    },
    // 从路由配置文件中读取路由配置以生成导航菜单信息
    getMenuList() {
      const menuData = []
      const routes = this.$router.options.routes
      for (let route of routes) {
        if (route.hideInMenu) {
          continue
        }
        let menuItem = {}
        menuItem['key'] = route['path']
        menuItem['title'] = route['meta']['title']
        menuItem['icon'] = route['meta']['icon']
        if (route['children']) {
          menuItem['children'] = []
          route['children'].forEach(childRoute => {
            menuItem['children'].push({key: childRoute['path'], title: childRoute['meta']['title']})
            this.openKeysMap[childRoute['path']] = menuItem['key']
          });
        } else {
          this.openKeysMap[menuItem['key']] = menuItem['key']
        }
        menuData.push(menuItem)
      }

      return menuData
    }
  }
}
</script>
