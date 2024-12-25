<template>
  <div class="history-tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      :tabBarGutter="3"
      @edit="onEdit"
      @change="onChange"
    >
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.path"
        :tab="tab.title"
        :closable="tabs.length > 1"
      />
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

interface TabItem {
  title: string
  path: string
}

const tabs = ref<TabItem[]>([])
const activeKey = ref('')

// 路由对应的标题映射
const routeTitleMap: Record<string, string> = {
  '/': '仪表盘',
  '/users': '用户管理',
  '/settings': '系统设置',
  '/profile': '个人信息'
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    const title = routeTitleMap[newPath] || '未知页面'
    activeKey.value = newPath
    
    // 如果标签不存在，则添加新标签
    if (!tabs.value.find(tab => tab.path === newPath)) {
      tabs.value.push({ title, path: newPath })
    }
  },
  { immediate: true }
)

// 处理标签切换
const onChange = (key: string) => {
  router.push(key)
}

// 处理标签关闭
const onEdit = (targetKey: string | MouseEvent, action: 'add' | 'remove') => {
  if (action === 'remove' && typeof targetKey === 'string') {
    const targetIndex = tabs.value.findIndex(tab => tab.path === targetKey)
    if (targetIndex === -1) return

    // 如果关闭的是当前标签，则需要跳转到其他标签
    if (targetKey === activeKey.value) {
      const newActiveKey = tabs.value[targetIndex - 1]?.path || tabs.value[targetIndex + 1]?.path
      if (newActiveKey) {
        router.push(newActiveKey)
      }
    }

    // 移除标签
    tabs.value = tabs.value.filter(tab => tab.path !== targetKey)
  }
}
</script>

<style scoped>
.history-tabs {
  padding: 6px 16px;
  background: v-bind('themeStore.isDark ? "#141414" : "#fff"');
  border-bottom: 1px solid v-bind('themeStore.isDark ? "#303030" : "#f0f0f0"');
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

:deep(.ant-tabs-tab) {
  padding: 4px 16px !important;
  background: transparent !important;
  border: none !important;
  transition: all 0.3s;
}

:deep(.ant-tabs-tab-active) {
  background: v-bind('themeStore.isDark ? "#1f1f1f" : "#e6f4ff"') !important;
  border-radius: 4px;
}

:deep(.ant-tabs-tab-remove) {
  margin-left: 4px;
  padding: 0;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .history-tabs {
    padding: 4px 8px;
  }

  :deep(.ant-tabs-tab) {
    padding: 4px 8px !important;
    margin: 0 2px !important;
  }
}
</style> 