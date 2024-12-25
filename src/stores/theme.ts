import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { theme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  
  const primaryColor = ref(localStorage.getItem('primaryColor') || '#1890ff')

  const themeConfig = ref<ThemeConfig>({
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: primaryColor.value,
    },
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateTheme()
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
    localStorage.setItem('primaryColor', color)
    updateTheme()
  }

  const updateTheme = () => {
    themeConfig.value = {
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: primaryColor.value,
      },
    }
  }

  return {
    isDark,
    primaryColor,
    themeConfig,
    toggleTheme,
    setPrimaryColor
  }
}) 