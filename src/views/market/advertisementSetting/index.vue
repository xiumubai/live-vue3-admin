<!--
 * @Description: 广告设置页面
 * @Autor: codeBo
 * @Date: 2023-06-15 16:16:59
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-21 10:28:59
-->
<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getAdSettingList"
      :initParam="initParam"
    >
      <template #smallPic="scope">
        <el-image style="height: 50px" :src="scope.row.smallPic" fit="cover" />
      </template>
      <template #status="scope">
        <el-switch v-model="scope.row.status" />
      </template>
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.User.add']"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          v-auth="['btn.User.remove']"
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
        <el-button @click="socketHandle">调试长链接</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.User.update']"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
      </template>
    </ProTable>
    <EditModal ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import EditModal from './components/EditModal.vue'
import type { AclUser } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  getAdSettingList,
  batchAdSetting,
  addAdSetting,
  updateAdSetting,
} from '@/api/market/advertisementSetting'
import { ProcessSocket } from '@/sdk/socket-process/process'

// 调试长链接服务， 请 本地启动 src/sdk/server/io.js 服务进行调试， 感谢
const socket = new ProcessSocket({ socketUrl: 'http://127.0.0.1:23456' })
const socketHandle = () => {
  socket.sendMessage('传输给后端的消息')
}
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '序号', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'advertisingName',
    label: '广告名称',
    search: { el: 'input', props: { placeholder: '输入广告名称' } },
  },
  {
    prop: 'smallPic',
    label: '缩略图',
    render: ({ row }) => {
      return (
        <>
          <el-avatar size={50} src={row.smallPic} />
        </>
      )
    },
  },
  { prop: 'pageContainer', label: '页面' },
  { prop: 'order', label: '排序值', width: 120 },
  { prop: 'createTime', label: '创建时间', sortable: true, width: 120 },
  { prop: 'updateTime', label: '有效时间', sortable: true, width: 120 },
  {
    prop: 'status',
    // 修改状态， 可以根据 row 找到修改的是哪一个的状态再调用接口
    label: '状态',
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 80 },
]

// *查询参数
const initParam = reactive({})
// *新增、编辑、分配角色
const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<AclUser.ResAclUserList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    getTableList: proTable.value?.getTableList,
    api: title === '新增' ? addAdSetting : updateAdSetting,
  }
  drawerRef.value.acceptParams(params)
}
// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchAdSetting, ids, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
</script>
