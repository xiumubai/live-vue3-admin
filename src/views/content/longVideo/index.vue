<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getLongVideoList">
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.UserNormal.add']"
          @click="openFormDialog('新增')"
        >
          新增
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.authStatus === 1"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.UserNormal.update']"
          @click="openFormDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="scope.row.authStatus === 1"
          type="primary"
          link
          icon="View"
          :disabled="!BUTTONS['btn.UserNormal.view']"
          @click="handleView(scope.row.id)"
        >
          详情
        </el-button>
        <el-button
          v-if="scope.row.authStatus !== 1"
          type="primary"
          link
          icon="View"
          :disabled="!BUTTONS['btn.UserNormal.view']"
          @click="openFormDialog('审核', scope.row)"
        >
          审核
        </el-button>
      </template>
    </ProTable>
    <PlayerDialog ref="PlayerDialogRef" />
    <FormDialog ref="FormDialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref, computed } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
// import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { changeStatus } from '@/api/common/index'
import { useHandleData } from '@/hooks/useHandleData'
import { getLongVideoList, getClassList } from '@/api/content/longVideo'
import { AUTHSTATUSLIST } from '@/utils/constant'
import { useRouter } from 'vue-router'
import PlayerDialog from './components/PlayerDialog.vue'
import FormDialog from './components/FormDialog.vue'
const { BUTTONS } = useAuthButtons()
const router = useRouter()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
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
    label: '视频',
    width: 100,
    render: ({ row }) => {
      return (
        <el-button type="primary" onClick={() => openPlayDialog(row.src)}>
          播放
        </el-button>
      )
    },
  },
  {
    prop: 'category',
    label: '分类',
    enum: getClassList,
    search: { el: 'select', props: { placeholder: '请选择分类' } },
    render: ({ row }) => {
      return <span>{row.category}</span>
    },
  },
  {
    prop: 'author',
    label: '上传者',
    search: { el: 'input', props: { placeholder: '请输入上传者名称' } },
  },
  { prop: 'phone', label: '手机号' },
  { prop: 'price', label: '视频价格', width: 100 },
  {
    prop: 'authStatus',
    label: '审核状态',
    width: 100,
    render: ({ row }) => {
      return row.authStatus === 0 ? '不通过' : '通过'
    },
    enum: computed(() => {
      return AUTHSTATUSLIST || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择VIP等级' } },
  },
  { prop: 'authName', label: '审核管理员', width: 120 },
  {
    prop: 'uploadTime',
    label: '上传时间',
    width: 120,
    search: {
      el: 'date-picker',
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
  },
  {
    prop: 'authTime',
    label: '审核时间',
    width: 120,
    search: {
      el: 'date-picker',
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
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

const PlayerDialogRef = ref()
/** 打开播放器弹窗 */
const openPlayDialog = (src: string) => {
  // 其他的逻辑
  let params = {
    src: src,
  }
  PlayerDialogRef.value.acceptParams(params)
}

/** 打开表单弹窗 */
const FormDialogRef = ref()
const openFormDialog = (title: string, row?: any) => {
  // 其他的逻辑
  let params = {
    title,
    rowData: { ...row },
    getTableList: proTable.value?.getTableList,
  }
  FormDialogRef.value.acceptParams(params)
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
    `切换【${row.title}】状态`,
  )
  // 切换成功，请求接口
  // proTable.value?.getTableList()
}

// *查看详情
const handleView = (id: number) => {
  router.push({
    path: `/content/long-video/show/${id}`,
  })
}
</script>

<style lang="scss" scoped></style>
