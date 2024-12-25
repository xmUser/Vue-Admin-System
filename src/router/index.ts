import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        public: true
      }
    },
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: {
            title: '仪表盘',
            icon: 'dashboard'
          }
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/Users.vue'),
          meta: {
            title: '用户管理',
            icon: 'user'
          }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/Settings.vue'),
          meta: {
            title: '系统设置',
            icon: 'setting'
          }
        }
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404',
        public: true
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || '后台管理系统'} - Vue Admin`
  
  // 检查是否登录（这里简单判断，实际项目中需要更复杂的逻辑）
  const isLoggedIn = localStorage.getItem('token')
  if (!to.meta.public && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router 