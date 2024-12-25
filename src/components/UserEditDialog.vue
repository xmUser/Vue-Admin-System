<template>
  <a-modal
    :open="visible"
    :title="editingUser ? '编辑用户' : '新增用户'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      
      <a-form-item label="年龄" name="age">
        <a-input-number v-model:value="formState.age" :min="1" :max="120" />
      </a-form-item>
      
      <a-form-item label="地址" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>
      
      <a-form-item label="角色" name="role">
        <a-select v-model:value="formState.role">
          <a-select-option value="admin">管理员</a-select-option>
          <a-select-option value="user">普通用户</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance } from 'ant-design-vue'

const props = defineProps<{
  visible: boolean
  editingUser?: any
}>()

const emit = defineEmits(['update:visible', 'save'])

const formRef = ref<FormInstance>()

const formState = reactive({
  username: '',
  name: '',
  age: 18,
  address: '',
  role: 'user'
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  name: [{ required: true, message: '请输入姓名' }],
  age: [{ required: true, message: '请输入年龄' }],
  address: [{ required: true, message: '请输入地址' }],
  role: [{ required: true, message: '请选择角色' }]
}

watch(() => props.editingUser, (newVal) => {
  if (newVal) {
    Object.assign(formState, newVal)
  } else {
    Object.assign(formState, {
      username: '',
      name: '',
      age: 18,
      address: '',
      role: 'user'
    })
  }
}, { immediate: true })

const handleOk = () => {
  formRef.value?.validate().then(() => {
    emit('save', { ...formState })
    emit('update:visible', false)
  })
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script> 