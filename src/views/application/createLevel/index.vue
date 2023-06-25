<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getCreateLevelList"
    >
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
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { getCreateLevelList } from '@/api/application/createLevel'

const { BUTTONS } = useAuthButtons()

// *表格配置项
const columns: ColumnProps[] = [
  { prop: 'id', label: '编号', width: 80 },
  { prop: 'level', label: '级别', width: 80 },
  {
    prop: 'title',
    label: '等级标题',
    width: 120,
    search: { el: 'input', props: { placeholder: '请输入等级标题' } },
    render: ({ row }) => {
      return <el-tag>{row.title}</el-tag>
    },
  },
  { prop: 'rate', label: '分成比例' },
  { prop: 'longVideoNum', label: '长视频上传数量' },
  { prop: 'shortVideoNum', label: '短视频上传数量' },
  { prop: 'createTime', label: '创建时间' },
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
