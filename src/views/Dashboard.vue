<template>
  <div class="dashboard">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card>
          <template #title>
            <span>
              <user-outlined /> 总用户数
            </span>
          </template>
          <div class="card-content">
            <h2>1,234</h2>
            <p>较上月增长 12%</p>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card>
          <template #title>
            <span>
              <line-chart-outlined /> 今日访问
            </span>
          </template>
          <div class="card-content">
            <h2>256</h2>
            <p>较昨日增长 5%</p>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card>
          <template #title>
            <span>
              <fund-outlined /> 系统消息
            </span>
          </template>
          <div class="card-content">
            <h2>12</h2>
            <p>本周新增 3 条</p>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" style="margin-top: 16px" class="chart-row">
      <a-col :xs="24" :lg="12" class="chart-col">
        <a-card title="访问量趋势" class="chart-card">
          <div ref="visitChartRef" class="chart-container"></div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :lg="12" class="chart-col">
        <a-card title="用户分布" class="chart-card">
          <div ref="userChartRef" class="chart-container"></div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <a-col :span="24">
        <a-card title="系统公告">
          <a-list :data-source="announcements" :pagination="false">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.title" />
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { UserOutlined, LineChartOutlined, FundOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'

const visitChartRef = ref()
const userChartRef = ref()
let visitChart: echarts.ECharts | null = null
let userChart: echarts.ECharts | null = null

const announcements = [
  { title: '系统将于本周日进行维护升级' },
  { title: '新功能上线公告' },
  { title: '关于系统安全更新的说明' },
  { title: '用户反馈功能开放公告' },
  { title: '系统性能优化完成报告' },
]

const initVisitChart = () => {
  if (visitChartRef.value) {
    setTimeout(() => {
      visitChart = echarts.init(visitChartRef.value)
      visitChart.setOption({
        grid: {
          top: 10,
          right: 10,
          bottom: 20,
          left: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#aaa'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          axisLabel: {
            fontSize: 12
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 2
          },
          areaStyle: {
            opacity: 0.2
          },
          itemStyle: {
            borderWidth: 1
          }
        }]
      })
    }, 0)
  }
}

const initUserChart = () => {
  if (userChartRef.value) {
    setTimeout(() => {
      userChart = echarts.init(userChartRef.value)
      userChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            data: [
              { value: 1048, name: '华东地区' },
              { value: 735, name: '华北地区' },
              { value: 580, name: '华南地区' },
              { value: 484, name: '西北地区' },
              { value: 300, name: '西南地区' }
            ],
            label: {
              show: true,
              fontSize: 12,
              formatter: '{b}\n{d}%'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }, 0)
  }
}

const handleResize = () => {
  if (visitChart) {
    visitChart.resize({ animation: { duration: 300 } })
  }
  if (userChart) {
    userChart.resize({ animation: { duration: 300 } })
  }
}

onMounted(() => {
  initVisitChart()
  initUserChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  visitChart?.dispose()
  userChart?.dispose()
})
</script>

<style scoped>
.dashboard {
  height: 100%;
}

.card-content {
  text-align: center;
}

.card-content h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.card-content p {
  color: rgba(0, 0, 0, 0.45);
  margin: 0;
}

.chart-row {
  height: 410px;
}

.chart-col {
  height: 100%;
}

.chart-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-card :deep(.ant-card-body) {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-container {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
}

:deep([data-theme='dark']) {
  .card-content p {
    color: rgba(255, 255, 255, 0.45);
  }
}

@media screen and (max-width: 768px) {
  .dashboard {
    height: 100%;
  }

  .chart-row {
    height: auto;
  }

  .chart-col {
    height: 360px;
  }
}
</style> 