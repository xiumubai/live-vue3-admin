<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getCreatorList">
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.UserNormal.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="View"
          :disabled="!BUTTONS['btn.UserNormal.view']"
          @click="handleView(scope.row.id)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref, computed } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { getCreatorList, update } from '@/api/user/creator'
import { changeStatus } from '@/api/common/index'
import { SEXLIST, CREATELEVEL } from '@/utils/constant'
import { useHandleData } from '@/hooks/useHandleData'
import { useRouter } from 'vue-router'
import Dialog from './components/Dialog.vue'
const router = useRouter()
const { BUTTONS } = useAuthButtons()

// *表格配置项
const columns: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  {
    prop: 'name',
    label: '用户名',
    fixed: 'left',
    search: { el: 'input', props: { placeholder: '请输入用户名' } },
  },
  {
    prop: 'avatar',
    label: '头像',
    width: 100,
    render: ({ row }) => {
      return (
        <>
          <el-avatar size={50} src={row.avatar} />
        </>
      )
    },
  },
  {
    prop: 'phone',
    label: '手机号',
    width: 140,
    search: { el: 'input', props: { placeholder: '请输入手机号' } },
  },
  {
    prop: 'sex',
    label: '性别',
    width: 100,
    render: ({ row }) => {
      return row.sex === 0 ? '男' : '女'
    },
    fieldNames: { label: 'name', value: 'id' },
    enum: computed(() => {
      return SEXLIST || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择性别' } },
  },
  {
    prop: 'level',
    label: '创作等级',
    width: 100,
    enum: computed(() => {
      return CREATELEVEL || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择VIP等级' } },
    render: ({ row }) => {
      return <span>{row.level}</span>
    },
  },
  { prop: 'longVideoNum', label: '长视频数量', width: 100 },
  { prop: 'shortVideoNum', label: '断视频数量', width: 100 },
  {
    prop: 'onlineStatus',
    label: '在线状态',
    width: 100,
    render: ({ row }) => {
      return row.onlineStatus === 0 ? (
        <el-tag type="success">在线</el-tag>
      ) : (
        <el-tag type="info">离线</el-tag>
      )
    },
  },
  {
    prop: 'createTime',
    label: '注册时间',
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 110,
    render: ({ row }) => {
      return (
        <el-switch
          v-model={row.status}
          active-text={row.status ? '启用' : '禁用'}
          onClick={() => handleChangeStatus(row)}
        />
      )
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 180 },
]
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
const DialogRef = ref()
const openDialog = async (title: string, row: any) => {
  // 检查是否有操作权限
  await useAuth(hasAuth('btn.UserNormal.update'))
  // 其他的逻辑
  let params = {
    rowData: { ...row },
    api: update,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

/** 修改状态 */
const handleChangeStatus = async (row: any) => {
  await useHandleData(
    changeStatus,
    {
      type: 'normalUser',
      id: row.id,
      status: row.status == 1 ? 0 : 1,
    },
    `切换【${row.name}】用户状态`,
  )
  // 切换成功，请求接口
  // proTable.value?.getTableList()
}

// *查看详情
const handleView = (id: number) => {
  router.push({
    path: `/user/creator/show/${id}`,
  })
}
</script>

<style lang="scss" scoped></style>
