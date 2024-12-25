import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    name: '管理员',
    avatar: '',
    roles: ['admin'],
    email: 'admin@example.com',
    phone: '13800138000',
    bio: '这个人很懒，什么都没有留下。'
  })

  const token = ref(localStorage.getItem('token') || '')

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const updateUserInfo = (info: Partial<typeof userInfo.value>) => {
    Object.assign(userInfo.value, info)
  }

  return {
    userInfo,
    token,
    setToken,
    clearToken,
    updateUserInfo
  }
}) 