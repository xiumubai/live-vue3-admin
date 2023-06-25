<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getLiveList">
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.UserNormal.add']"
          @click="openDialog('新增')"
        >
          新增
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.UserNormal.update']"
          @click="openDialog('编辑')"
        >
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.UserNormal.view']"
        >
          删除
        </el-button>
      </template>
    </ProTable>
  </div>
</template>
<script setup lang="tsx">
import { ref, computed } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { getLiveList } from '@/api/content/live'
import { LIVETATUSLIST } from '@/utils/constant'
const { BUTTONS } = useAuthButtons()

// *表格配置项
const columns: ColumnProps[] = [
  // { type: 'selection', fixed: 'left', width: 80 },
  // { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'Id', width: 80 },
  {
    prop: 'title',
    label: '标题',
    width: 120,
    search: { el: 'input', props: { placeholder: '请输入标题名称' } },
  },
  {
    prop: 'postUrl',
    label: '封面',
    width: 250,
    render: ({ row }) => {
      return (
        <el-image
          style="width: 200px; height: 100px"
          src={row.postUrl}
          fit="cover"
        />
      )
    },
  },
  {
    prop: 'src',
    label: '直播',
    width: 100,
    render: () => {
      return <el-button type="primary">去围观</el-button>
    },
  },
  { prop: 'tagName', label: '标签' },
  { prop: 'liver', label: '主播' },
  { prop: 'phone', label: '手机号', width: 120 },
  {
    prop: 'liveStatus',
    label: '直播状态',
    width: 100,
    render: ({ row }) => {
      return row.liveStatus === 0 ? (
        <el-tag type="warning">已结束</el-tag>
      ) : (
        <el-tag type="primary">直播中</el-tag>
      )
    },
    enum: computed(() => {
      return LIVETATUSLIST || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择直播状态' } },
  },
  { prop: 'account', label: '直播收益', width: 120 },
  {
    prop: 'startTime',
    label: '开播时间',
    width: 120,
    search: {
      el: 'date-picker',
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
  },
  { prop: 'endTime', label: '结束时间', width: 120 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }) => {
      return <el-switch v-model={row.status} />
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 180 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

const openDialog = async (title: string) => {
  // 检查是否有操作权限
  const isAuth =
    title === '新增'
      ? hasAuth('btn.UserNormal.add1')
      : hasAuth('btn.UserNormal.update2')
  await useAuth(isAuth)
  // 其他的逻辑
}
</script>

<style lang="scss" scoped></style>
