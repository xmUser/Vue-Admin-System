<template>
  <a-config-provider :theme="themeStore.themeConfig">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 为所有卡片添加阴影效果 */
.ant-card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 
              0 1px 6px -1px rgba(0, 0, 0, 0.02), 
              0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

/* 深色模式下的阴影效果 */
[data-theme='dark'] .ant-card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15), 
              0 1px 6px -1px rgba(0, 0, 0, 0.12), 
              0 2px 4px 0 rgba(0, 0, 0, 0.12);
}
</style> 