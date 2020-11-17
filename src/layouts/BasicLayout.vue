<template>
  <a-layout id="components-layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible width="256px">
      <div class="logo" />
      <SideMenu theme="dark" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content id="layout-content">
        <MainLayout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from './SiderMenu'
import MainLayout from './MainLayout'

export default {
  components: {
    SideMenu,
    MainLayout
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
#components-layout {
  min-height: 100vh;
}

#components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout .trigger:hover {
  color: #1890ff;
}

#components-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
