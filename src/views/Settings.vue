<template>
  <div class="settings-container">
    <a-card title="系统设置" class="settings-card">
      <a-form
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="系统名称">
          <a-input v-model:value="formState.systemName" />
        </a-form-item>
        
        <a-form-item label="系统主题">
          <a-select v-model:value="formState.theme">
            <a-select-option value="light">浅色</a-select-option>
            <a-select-option value="dark">深色</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="导航模式">
          <a-select v-model:value="formState.navMode">
            <a-select-option value="side">侧边菜单</a-select-option>
            <a-select-option value="top">顶部菜单</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="通知设置">
          <a-space direction="vertical">
            <a-checkbox v-model:checked="formState.notifications.email">
              接收邮件通知
            </a-checkbox>
            <a-checkbox v-model:checked="formState.notifications.message">
              接收站内信
            </a-checkbox>
            <a-checkbox v-model:checked="formState.notifications.desktop">
              接收桌面通知
            </a-checkbox>
          </a-space>
        </a-form-item>
        
        <a-form-item label="页面动画">
          <a-switch v-model:checked="formState.pageAnimation" />
        </a-form-item>
        
        <a-form-item label="主题模式">
          <a-switch
            v-model:checked="isDark"
            checked-children="深色"
            un-checked-children="浅色"
            @change="handleThemeChange"
          />
        </a-form-item>
        
        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-space>
            <a-button type="primary" @click="handleSave">保存设置</a-button>
            <a-button @click="resetSettings">重置设置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const isDark = ref(themeStore.isDark)

interface FormState {
  systemName: string
  theme: string
  navMode: string
  notifications: {
    email: boolean
    message: boolean
    desktop: boolean
  }
  pageAnimation: boolean
}

const defaultSettings: FormState = {
  systemName: 'Vue Admin System',
  theme: 'light',
  navMode: 'side',
  notifications: {
    email: true,
    message: true,
    desktop: false
  },
  pageAnimation: true
}

const formState = reactive<FormState>({ ...defaultSettings })

const handleSave = () => {
  // 这里可以调用API保存设置
  localStorage.setItem('systemSettings', JSON.stringify(formState))
  message.success('设置保存成功！')
}

const resetSettings = () => {
  Object.assign(formState, defaultSettings)
  message.success('设置已重置！')
}

const handleThemeChange = (checked: boolean) => {
  themeStore.toggleTheme()
  message.success(`已切换到${checked ? '深色' : '浅色'}主题`)
}
</script>

<style scoped>
.settings-container {
  height: 100%;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  overflow-y: auto;
}

.settings-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style> 