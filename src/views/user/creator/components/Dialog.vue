<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    title="编辑"
    width="30%"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="{ ...dialogProps.rowData }"
    >
      <el-form-item label="创作等级" prop="level">
        <el-select
          v-model="dialogProps.rowData!.level"
          placeholder="请选择创作等级"
          style="width: 90%"
        >
          <el-option
            v-for="item in CREATELEVEL"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { CREATELEVEL } from '@/utils/constant'
// 定义props类型
interface DialogProps {
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
  levle: [{ required: true, message: '请选择用户等级' }],
})

const loading = ref<boolean>(false)

const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({})
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(dialogProps.value.rowData)
      ElMessage.success({
        message: `修改${dialogProps.value.rowData.name}用户等级成功！`,
      })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
