<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    title="认证"
    width="50%"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="{ ...authParams }"
    >
      <el-form-item label="真实姓名">
        <span>{{ authMsg.name }}</span>
      </el-form-item>
      <el-form-item label="出生年月">
        <span>{{ authMsg.birthday }}</span>
      </el-form-item>
      <el-form-item label="身份证照片">
        <div v-for="url in authMsg.idCardUrl" :key="url" class="block">
          <el-image
            style="width: 150px; margin-right: 15px"
            :src="url"
            :preview-src-list="authMsg.idCardUrl"
          />
        </div>
      </el-form-item>
      <el-form-item label="申请时间">
        <span>{{ authMsg.time }}</span>
      </el-form-item>
      <el-form-item label="备注">
        <span>{{ authMsg.remark }}</span>
      </el-form-item>
      <el-form-item label="是否通过认证" prop="level">
        <el-radio-group v-model="authParams.status" class="ml-4">
          <el-radio label="1" size="large">通过</el-radio>
          <el-radio label="0" size="large">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          width="70%"
          v-model="authParams.remark"
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
          placeholder="请输入审核备注"
        />
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

// 定义props类型
interface DialogProps {
  id: string
  anchor?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// 主播认证信息
let authMsg = reactive({
  name: '',
  remark: '',
  time: '',
  birthday: '',
  idCardUrl: [],
})
// 认证参数
const authParams = reactive({
  /**
   * 认证意见：通过｜不通过
   */
  status: '1',
  /**
   * 备注
   */
  remark: '',
})

const rules = reactive({
  status: [{ required: true, message: '请选择认证意见' }],
})

const loading = ref<boolean>(false)

const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  id: '',
})
// 接收父组件参数
const acceptParams = async (params: DialogProps) => {
  authMsg = (await params.anchor) || {}
  dialogProps.value = params
  dialogVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      const params = {
        id: dialogProps.value.id,
        ...authParams,
      }
      await dialogProps.value.api!(params)
      ElMessage.success({
        message: `审批成功！`,
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
