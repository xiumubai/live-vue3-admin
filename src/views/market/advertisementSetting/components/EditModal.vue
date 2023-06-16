<!--
 * @Description: 弹窗啊呜呜
 * @Autor: codeBo
 * @Date: 2023-06-16 16:45:55
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-16 17:30:31
-->
<template>
  <el-dialog
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}用户`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.rowData"
    >
      <el-form-item label="广告名称" prop="advertisingName">
        <el-input
          v-model="drawerProps.rowData.advertisingName"
          placeholder="请输入，限制30字符"
          clearable
        />
      </el-form-item>
      <el-form-item label="排序值" prop="order">
        <el-input
          v-model="drawerProps.rowData.order"
          placeholder="请输入排序值"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FormInstance, ElMessage } from 'element-plus'
interface DrawerProps {
  title: string
  rowData?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const loading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  advertisingName: [
    { required: true, message: '请填写广告名称' },
    { max: 30, message: '广告名称30字符以内' },
  ],
  order: [{ required: true, message: '请填排序值' }],
})
// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})
// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  if (params.title === '新增') {
    console.log(111)
  }
  drawerProps.value = params
  drawerVisible.value = true
}
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await drawerProps.value.api!(drawerProps.value.rowData)
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      drawerVisible.value = false
      loading.value = false
      drawerProps.value.getTableList!()
    } catch (err) {
      loading.value = false
      console.log(err)
    }
  })
}
defineExpose({
  acceptParams,
})
</script>
