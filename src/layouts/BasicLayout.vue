<template>
  <a-layout class="layout">
    <!-- 移动端抽屉菜单 -->
    <a-drawer
      v-model:open="drawerVisible"
      placement="left"
      :closable="false"
      :wrap-style="{ padding: 0 }"
      :bodyStyle="{ padding: 0, margin: 0 }"
      :contentWrapperStyle="{ 
        boxShadow: 'none',
        background: themeStore.isDark ? '#001529' : '#fff'
      }"
      :width="200"
      class="layout-drawer"
    >
      <div class="logo-container">
        <crown-outlined :style="{ color: themeStore.isDark ? '#fff' : '#001529' }" class="logo-icon" />
        <span :style="{ color: themeStore.isDark ? '#fff' : '#001529' }" class="logo-text">Vue Admin</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="themeStore.isDark ? 'dark' : 'light'"
        mode="inline"
        class="side-menu"
        @click="handleMenuClick"
      >
        <a-menu-item key="1">
          <dashboard-outlined />
          <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <setting-outlined />
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-drawer>

    <!-- PC端侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :theme="themeStore.isDark ? 'dark' : 'light'"
      class="layout-sider"
      v-if="!isMobile"
      :style="{ 
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 101
      }"
    >
      <div class="logo-container">
        <crown-outlined :style="{ color: themeStore.isDark ? '#fff' : '#001529' }" class="logo-icon" />
        <span :style="{ color: themeStore.isDark ? '#fff' : '#001529' }" class="logo-text" v-if="!collapsed">Vue Admin</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="themeStore.isDark ? 'dark' : 'light'"
        mode="inline"
        class="side-menu"
        @click="handleMenuClick"
      >
        <a-menu-item key="1">
          <dashboard-outlined />
          <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <setting-outlined />
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout :style="{ marginLeft: isMobile ? '0' : (collapsed ? '80px' : '200px') }">
      <a-layout-header 
        class="layout-header"
        :class="{ 'header-fixed': true }"
        :style="{ 
          background: themeStore.isDark ? '#141414' : '#fff',
          padding: 0,
          width: isMobile ? '100%' : `calc(100% - ${collapsed ? '80px' : '200px'})`,
        }"
      >
        <!-- 移动端菜单按钮 -->
        <menu-outlined
          v-if="isMobile"
          class="trigger"
          @click="drawerVisible = true"
        />

        <!-- 添加折叠按钮 -->
        <menu-fold-outlined
          v-if="!collapsed && !isMobile"
          class="trigger"
          @click="() => (collapsed = true)"
        />
        <menu-unfold-outlined
          v-if="collapsed && !isMobile"
          class="trigger"
          @click="() => (collapsed = false)"
        />

        <!-- 右侧工具栏 -->
        <div class="header-tools">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              管理员 <down-outlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="router.push('/profile')">个人信息</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="handleLogout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 添加一个占位元素，防止内容被固定 header 遮挡 -->
      <div :style="{ height: '64px' }"></div>

      <!-- 添加历史标签页 -->
      <history-tabs v-if="!isMobile" />

      <a-layout-content class="layout-content">
        <div class="content-container">
          <router-view></router-view>
        </div>
      </a-layout-content>

      <a-layout-footer :style="{
        textAlign: 'center',
        background: themeStore.isDark ? '#141414' : '#fff',
        padding: '16px 50px'
      }">
        Admin System ©2024 Created by Your Name
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  MenuOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { message } from 'ant-design-vue'
import HistoryTabs from '../components/HistoryTabs.vue'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])
const drawerVisible = ref<boolean>(false)
const isMobile = ref<boolean>(false)

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()

// 检查是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    drawerVisible.value = false
  }
}

// 监听窗口大小变化
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const handleMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/users')
      break
    case '3':
      router.push('/settings')
      break
  }
  // 在移动端点击菜单项后关闭抽屉
  if (isMobile.value) {
    drawerVisible.value = false
  }
}

const handleLogout = () => {
  userStore.clearToken()
  router.push('/login')
  message.success('退出登录成功')
}
</script>

<style scoped>
/* 基础布局样式 */
.layout {
  min-height: 100vh;
}

/* Logo 相关样式 */
.logo-container {
  flex-shrink: 0;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s;
  background: v-bind('themeStore.isDark ? "#001529" : "#fff"');
  border-bottom: 1px solid v-bind('themeStore.isDark ? "#303030" : "#f0f0f0"');
}

.logo-icon {
  font-size: 24px;
  margin-right: 8px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  margin: 0;
}

/* 侧边栏和菜单样式 */
.layout-sider,
:deep(.ant-drawer-body) {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: v-bind('themeStore.isDark ? "#001529" : "#fff"');
}

.side-menu {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 0;
}

/* 滚动条样式 */
.side-menu::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  display: none;
}

.side-menu:hover::-webkit-scrollbar {
  display: block;
}

.side-menu::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.side-menu::-webkit-scrollbar-track {
  background: transparent;
}

:deep([data-theme='dark']) .side-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* 侧边栏触发器样式 */
:deep(.ant-layout-sider-trigger) {
  border-right: 1px solid v-bind('themeStore.isDark ? "#303030" : "#f0f0f0"');
}

:deep(.ant-layout-sider-light) {
  border-right: 1px solid #f0f0f0;
}

:deep(.ant-layout-sider-light .ant-layout-sider-trigger) {
  color: rgba(0, 0, 0, 0.45);
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

:deep(.ant-layout-sider-dark .ant-layout-sider-trigger) {
  background: #001529;
}

/* 抽屉样式 */
:deep(.ant-drawer-body) {
  padding: 0;
}

:deep(.ant-drawer-wrapper-body) {
  background: v-bind('themeStore.isDark ? "#001529" : "#fff"');
}

/* Header 相关样式 */
.header-fixed {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 深色模式下的阴影效果 */
:deep([data-theme='dark']) .header-fixed {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .header-fixed {
    width: 100% !important;
    left: 0;
  }

  .ant-dropdown-link {
    margin-right: 24px;
  }
}

/* 抽屉样式优化 */
.layout-drawer {
  /* 移除之前的样式，改用属性控制 */
  :deep(.ant-drawer-body) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* 深色模式下的 Logo 和文字颜色 */
  :deep([data-theme='dark']) & {
    .logo-icon {
      color: #fff;
    }

    .logo-text {
      color: #fff;
    }
  }

  /* 移动端 Logo 样式与 PC 端保持一致 */
  .logo-container {
    justify-content: center;
    padding: 16px;
  }

  /* 移动端菜单样式与 PC 端保持一致 */
  .side-menu {
    border-right: none;
    background: v-bind('themeStore.isDark ? "#001529" : "#fff"');
  }

  /* 确保菜单项的内边距一致 */
  :deep(.ant-menu-item) {
    margin: 0;
    padding-left: 24px !important;
  }
}

/* 确保深色模式下的样式统一 */
:deep([data-theme='dark']) {
  .layout-drawer .ant-drawer-body,
  .layout-sider {
    background: #001529;
  }

  .layout-drawer .side-menu {
    background: #001529;
  }

  /* 添加深色模式下的 Logo 和文字颜色 */
  .logo-icon,
  .logo-text {
    color: #fff;
  }
}

/* 移除重复的样式定义 */
.logo-container {
  flex-shrink: 0;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s;
  background: v-bind('themeStore.isDark ? "#001529" : "#fff"');
  border-bottom: 1px solid v-bind('themeStore.isDark ? "#303030" : "#f0f0f0"');
}

/* 移除不需要的样式 */
.drawer-logo-container,
.drawer-menu,
.logo,
.drawer-logo {
  display: none;
}

/* Header 相关样式 */
.header-content {
  height: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.ant-dropdown-link {
  color: v-bind('themeStore.isDark ? "#fff" : "rgba(0, 0, 0, 0.85)"');
  cursor: pointer;
  transition: color 0.3s;
}

.ant-dropdown-link:hover {
  color: v-bind('themeStore.primaryColor');
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .header-content {
    padding-left: 64px; /* 为移动端菜单按钮留出空间 */
  }
}

/* 内容区域样式 */
.layout-content {
  margin: 16px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px - 41px - 69px - 48px);
  min-height: 360px;
  background: v-bind('themeStore.isDark ? "#141414" : "#fff"');
  border-radius: 2px;
}

.content-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
.content-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.content-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.content-container::-webkit-scrollbar-track {
  background: transparent;
}

/* 深色模式下的滚动条样式 */
:deep([data-theme='dark']) .content-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .layout-content {
    margin: 20px 16px;
  }

  .content-container {
    padding: 16px;
  }
}

.layout-header {
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: v-bind('themeStore.isDark ? "#141414" : "#fff"');
  border-bottom: 1px solid v-bind('themeStore.isDark ? "#303030" : "#f0f0f0"');
  transition: all 0.2s;
}

/* 右侧工具栏样式 */
.header-tools {
  margin-right: 16px;
}

/* 折叠按钮样式 */
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0 24px;
  color: v-bind('themeStore.isDark ? "#fff" : "rgba(0, 0, 0, 0.85)"');
}

.trigger:hover {
  color: v-bind('themeStore.primaryColor');
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .trigger {
    padding: 0 12px;
  }
}
</style> 