# Vue 3 Admin Template

一个现代化的后台管理系统模板，基于 Vue 3 + TypeScript + Ant Design Vue 构建。

## 技术栈

- 🚀 Vue 3.4 - 渐进式 JavaScript 框架
- 🔧 TypeScript - JavaScript 的超集，提供类型支持
- 📦 Ant Design Vue 4.x - 企业级 UI 组件库
- 🏗️ Vite - 下一代前端构建工具
- 📊 ECharts 5.x - 功能强大的数据可视化库
- 🗃️ Pinia - Vue 状态管理库
- 🛣️ Vue Router - Vue 官方路由

## 主要特性

### 1. 布局设计
- ✨ 响应式布局，支持PC端和移动端
- 📱 可折叠侧边栏
- 🔖 多页签导航
- 🌓 深色/浅色主题切换
- 🎨 主题色自定义

### 2. 用户体验
- 🚪 登录/登出功能
- 👤 用户信息管理
- 🔐 基于 Token 的认证
- 📲 移动端抽屉式菜单

### 3. 组件功能
- 📋 基础表格示例（用户管理）
- 📊 数据可视化（仪表盘）
- 🛠️ 系统设置
- 👤 个人中心

## 快速开始

```bash
# 克隆项目
git clone [https://github.com/xmUser/Vue-Admin-System.git]

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
├── src/
│   ├── components/       # 公共组件
│   │   ├── HistoryTabs.vue    # 页签导航组件
│   │   └── UserEditDialog.vue # 用户编辑对话框
│   ├── layouts/         # 布局组件
│   │   └── BasicLayout.vue    # 基础布局
│   ├── router/          # 路由配置
│   ├── stores/          # 状态管理
│   │   ├── theme.ts     # 主题状态
│   │   └── user.ts      # 用户状态
│   └── views/           # 页面组件
│       ├── Dashboard.vue # 仪表盘
│       ├── Login.vue     # 登录页
│       ├── Users.vue     # 用户管理
│       └── Settings.vue  # 系统设置
├── vite.config.ts       # Vite 配置
└── package.json         # 项目配置
```

## 功能说明

### 布局组件 (BasicLayout)
- 响应式侧边栏，支持折叠展开
- 固定顶部导航栏
- 页签式导航
- 移动端自适应

### 用户管理
- 用户列表展示
- 新增/编辑/删除用户
- 分页功能
- 用户角色管理

### 主题功能
- 支持深色/浅色模式切换
- 自定义主题色
- 主题配置持久化

### 数据可视化
- 访问量趋势图
- 用户分布饼图
- 实时数据更新

## 开发指南

### 新增路由
```typescript
// router/index.ts
{
  path: '/new-page',
  component: () => import('../views/NewPage.vue'),
  meta: {
    title: '新页面',
    requiresAuth: true
  }
}
```

### 状态管理
```typescript
// stores/example.ts
export const useExampleStore = defineStore('example', {
  state: () => ({
    // 状态定义
  }),
  actions: {
    // 操作方法
  }
})
```

### 组件开发
```vue
<!-- components/Example.vue -->
<template>
  <div class="example-component">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>
```

## 浏览器支持

- 现代浏览器
- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

[MIT](LICENSE)

## 致谢

- [Vue.js](https://vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [ECharts](https://echarts.apache.org/)
