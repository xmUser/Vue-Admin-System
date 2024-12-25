<template>
  <div class="profile-container">
    <a-card title="个人信息" class="profile-card">
      <a-row :gutter="[24, 24]">
        <a-col :span="8">
          <div class="avatar-wrapper">
            <a-avatar :size="120" :src="userInfo.avatar">
              {{ userInfo.name.charAt(0) }}
            </a-avatar>
            <a-upload
              name="avatar"
              :show-upload-list="false"
              action="/api/upload"
              @change="handleAvatarChange"
            >
              <a-button type="link">更换头像</a-button>
            </a-upload>
          </div>
        </a-col>
        
        <a-col :span="16">
          <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="formState.username" disabled />
            </a-form-item>
            
            <a-form-item label="姓名" name="name">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            
            <a-form-item label="邮箱" name="email">
              <a-input v-model:value="formState.email" />
            </a-form-item>
            
            <a-form-item label="手机" name="phone">
              <a-input v-model:value="formState.phone" />
            </a-form-item>
            
            <a-form-item label="简介" name="bio">
              <a-textarea v-model:value="formState.bio" :rows="4" />
            </a-form-item>
            
            <a-form-item :wrapper-col="{ offset: 4, span: 18 }">
              <a-space>
                <a-button type="primary" @click="handleSave">保存修改</a-button>
                <a-button @click="handleChangePassword">修改密码</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>

    <!-- 修改密码对话框 -->
    <a-modal
      v-model:open="passwordModalVisible"
      title="修改密码"
      @ok="handlePasswordOk"
    >
      <a-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="当前密码" name="oldPassword">
          <a-input-password v-model:value="passwordForm.oldPassword" />
        </a-form-item>
        
        <a-form-item label="新密码" name="newPassword">
          <a-input-password v-model:value="passwordForm.newPassword" />
        </a-form-item>
        
        <a-form-item label="确认新密码" name="confirmPassword">
          <a-input-password v-model:value="passwordForm.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '../stores/user'
import type { FormInstance } from 'ant-design-vue'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const formRef = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()

const formState = reactive({
  username: userStore.userInfo.name,
  name: userStore.userInfo.name,
  email: userStore.userInfo.email,
  phone: userStore.userInfo.phone,
  bio: userStore.userInfo.bio
})

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
  ]
}

const handleSave = () => {
  formRef.value?.validate().then(() => {
    userStore.updateUserInfo({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      bio: formState.bio
    })
    message.success('个人信息更新成功！')
  })
}

const handleAvatarChange = (info: any) => {
  if (info.file.status === 'done') {
    message.success('头像上传成功！')
  } else if (info.file.status === 'error') {
    message.error('头像上传失败！')
  }
}

// 修改密码相关
const passwordModalVisible = ref(false)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirmPassword = async (_rule: any, value: string) => {
  if (value !== passwordForm.newPassword) {
    throw new Error('两次输入的密码不一致！')
  }
}

const passwordRules = {
  oldPassword: [{ required: true, message: '请输入当前密码' }],
  newPassword: [
    { required: true, message: '请输入新密码' },
    { min: 6, message: '密码长度不能小于6位' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码' },
    { validator: validateConfirmPassword, trigger: 'change' }
  ]
}

const handleChangePassword = () => {
  passwordModalVisible.value = true
}

const handlePasswordOk = () => {
  passwordFormRef.value?.validate().then(() => {
    message.success('密码修改成功！')
    passwordModalVisible.value = false
  })
}
</script>

<style scoped>
.profile-container {
  height: 100%;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .profile-container {
    padding: 12px;
  }
}

.profile-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.avatar-wrapper {
  text-align: center;
}

.avatar-wrapper :deep(.ant-avatar) {
  margin-bottom: 16px;
}
</style> 