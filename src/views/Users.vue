<template>
  <div class="users-container">
    <a-card title="用户管理" class="users-card">
      <template #extra>
        <a-button type="primary" @click="showAddDialog">
          <plus-outlined /> 新增用户
        </a-button>
      </template>

      <div class="table-container">
        <div class="table-wrapper">
          <a-table 
            :columns="columns" 
            :data-source="data" 
            :loading="loading"
            :pagination="false"
            :scroll="{ y: 'calc(100vh - 450px)' }"
            class="users-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'role'">
                <a-tag :color="record.role === 'admin' ? 'blue' : 'green'">
                  {{ record.role === 'admin' ? '管理员' : '普通用户' }}
                </a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="handleEdit(record)">编辑</a>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    title="确定要删除这条记录吗？"
                    @confirm="handleDelete(record)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>

        <div class="pagination-container">
          <a-pagination
            v-model:current="pagination.current"
            v-model:pageSize="pagination.pageSize"
            :total="pagination.total"
            show-size-changer
            show-quick-jumper
            @change="handlePageChange"
            @showSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </a-card>

    <user-edit-dialog
      v-model:visible="dialogVisible"
      :editing-user="editingUser"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import UserEditDialog from '../components/UserEditDialog.vue'

interface User {
  key: string
  username: string
  name: string
  age: number
  address: string
  role: string
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 模拟一个大数据集
const allData = Array.from({ length: 50 }, (_, index) => ({
  key: (index + 1).toString(),
  username: `user${index + 1}`,
  name: index === 0 ? '张三' : `用户${index + 1}`,
  age: Math.floor(Math.random() * 30) + 20,
  address: ['北京市朝阳区', '上海市浦东新区', '广州市天河区', '深圳市南山区'][Math.floor(Math.random() * 4)],
  role: index === 0 ? 'admin' : 'user'
}))

const loading = ref(false)
const data = ref<User[]>([])

const dialogVisible = ref(false)
const editingUser = ref<User | null>(null)

const showAddDialog = () => {
  editingUser.value = null
  dialogVisible.value = true
}

const handleEdit = (record: User) => {
  editingUser.value = { ...record }
  dialogVisible.value = true
}

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: allData.length,  // 设置总数据量
  showSizeChanger: true,
  showQuickJumper: true
})

// 获取分页数据
const fetchUserData = () => {
  loading.value = true
  // 模拟 API 调用
  setTimeout(() => {
    const start = (pagination.current - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    data.value = allData.slice(start, end)
    loading.value = false
  }, 300)
}

// 分页变化处理函数
const handlePageChange = (page: number, pageSize: number) => {
  pagination.current = page
  pagination.pageSize = pageSize
  fetchUserData()
}

// 每页条数变化处理函数
const handleSizeChange = (current: number, size: number) => {
  pagination.pageSize = size
  pagination.current = 1  // 切换每页条数时重置到第一页
  fetchUserData()
}

// 处理删除
const handleDelete = (record: User) => {
  const index = allData.findIndex(item => item.key === record.key)
  if (index > -1) {
    allData.splice(index, 1)
    pagination.total = allData.length
    // 如果当前页没有数据了，则跳转到上一页
    if (data.value.length === 1 && pagination.current > 1) {
      pagination.current--
    }
    fetchUserData()
    message.success('删除成功')
  }
}

// 处理保存
const handleSave = (values: any) => {
  if (editingUser.value) {
    // 编辑
    const index = allData.findIndex(item => item.key === editingUser.value?.key)
    if (index > -1) {
      allData[index] = { ...values, key: editingUser.value.key }
      fetchUserData()
    }
  } else {
    // 新增
    const newUser = {
      ...values,
      key: Date.now().toString()
    }
    allData.unshift(newUser)
    pagination.total = allData.length
    pagination.current = 1  // 跳转到第一页
    fetchUserData()
  }
  message.success(`${editingUser.value ? '编辑' : '新增'}成功`)
}

// 初始加载数据
onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
.users-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.users-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 确保卡片内容区域占满剩余空间 */
:deep(.ant-card-body) {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 允许内容收缩 */
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 允许内容收缩 */
}

/* 表格包装器 */
.table-wrapper {
  flex: 1;
  min-height: 0; /* 允许内容收缩 */
  overflow: hidden;
}

/* 表格样式 */
.users-table {
  height: 100%;
}

/* 表格滚动区域样式 */
:deep(.ant-table-wrapper) {
  height: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 8px 8px 0 0;
}

/* 深色模式下的边框颜色 */
:deep([data-theme='dark']) .ant-table-wrapper {
  border: 1px solid #303030;
  border-radius: 8px 8px 0 0;
}

/* 去掉表格最后一行的下边框 */
:deep(.ant-table-wrapper .ant-table:not(.ant-table-bordered) .ant-table-tbody >tr:last-child>td) {
  border-bottom: none;
}

:deep(.ant-table) {
  height: 100%;
}

:deep(.ant-table-container) {
  height: 100%;
}

/* 固定表头 */
:deep(.ant-table-header) {
  position: sticky;
  top: 0;
  z-index: 2;
}

.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  :deep(.ant-card-body) {
    padding: 12px;
  }

  .pagination-container {
    margin-top: 12px;
  }

  /* 确保移动端表格高度与 PC 端一致 */
  :deep(.ant-table-body) {
    max-height: calc(100vh - 360px) !important;
  }
}
</style> 