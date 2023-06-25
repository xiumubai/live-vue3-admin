<template>
  <div class="content">
    <div class="left">
      <h4>所有分类</h4>
      <el-tree :data="list" default-expand-all />
    </div>
    <div class="right">
      <ProTable
        ref="proTable"
        :columns="columns"
        :requestApi="getVideoClassList"
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
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { getVideoClassList, getAllClass } from '@/api/application/videoClass'

const { BUTTONS } = useAuthButtons()
const list = ref()
// *表格配置项
const columns: ColumnProps[] = [
  { prop: 'id', label: '编号', width: 80 },
  {
    prop: 'name',
    label: '分类名称',
    width: 120,
    search: { el: 'input', props: { placeholder: '请输入标签名称' } },
    render: ({ row }) => {
      return <el-tag>{row.name}</el-tag>
    },
  },
  {
    prop: 'parentName',
    label: '父级分类名',
    width: 120,
    render: ({ row }) => {
      return <el-tag>{row.parentName}</el-tag>
    },
  },
  { prop: 'createTime', label: '创建时间' },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }) => {
      return <el-switch v-model={row.status} />
    },
  },
  { prop: 'mark', label: '备注' },
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

onMounted(async () => {
  const res = await getAllClass()
  list.value = res.data
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    width: 200px;
    background: #fff;
    padding: 16px;
    margin-right: 20px;
  }
  .right {
    flex: 1;
  }
}
</style>
