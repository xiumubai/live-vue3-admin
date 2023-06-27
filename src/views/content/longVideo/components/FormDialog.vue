<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    :append-to-body="true"
    :title="dialogProps.title"
    width="45%"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="{ ...dialogProps.rowData }"
    >
      <div>
        <h3>基本信息</h3>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="dialogProps.rowData!.title"
            placeholder="请输入标题"
            style="width: 50%"
          />
        </el-form-item>
        <el-form-item label="封面" prop="postUrl">
          <UploadImg
            v-model:imageUrl="dialogProps.rowData!.postUrl"
            width="250px"
            :file-size="3"
          >
            <template #empty>
              <el-icon><Picture /></el-icon>
              <span>请上传视频封面</span>
            </template>
          </UploadImg>
        </el-form-item>
        <el-form-item label="视频" prop="src">
          <UploadImg
            v-model:imageUrl="dialogProps.rowData!.src"
            width="250px"
            :file-size="3"
          >
            <template #empty>
              <el-icon><Picture /></el-icon>
              <span>请上传视频封面</span>
            </template>
          </UploadImg>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select
            v-model="dialogProps.rowData!.category"
            placeholder="请选分类"
            style="width: 50%"
          >
            <el-option
              v-for="item in CATEGORY"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="视频价格" prop="price">
          <el-input
            v-model="dialogProps.rowData!.price"
            placeholder="请输入视频价格"
            style="width: 50%"
          />
        </el-form-item>
      </div>

      <div v-if="dialogProps.title === '审核'">
        <h3>审核信息</h3>
        <el-form-item label="是否通过认证" prop="level">
          <el-radio-group v-model="dialogProps.rowData!.status" class="ml-4">
            <el-radio label="1" size="large">通过</el-radio>
            <el-radio label="0" size="large">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            style="width: 70%"
            v-model="dialogProps.rowData!.remark"
            :autosize="{ minRows: 3, maxRows: 5 }"
            type="textarea"
            placeholder="请输入审核备注"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="PlayerDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { CATEGORY } from '@/utils/constant'
import {
  addLongVideo,
  updateLongVideo,
  authLongVideo,
} from '@/api/content/longVideo'
// 定义props类型
interface DialogProps {
  title: string
  rowData?: any
  getTableList?: () => Promise<any>
}
const rules = reactive({
  title: [{ required: true, message: '请输入标题' }],
  postUrl: [{ required: true, message: '请上传视频封面' }],
  src: [{ required: true, message: '请上传视频' }],
})

const loading = ref<boolean>(false)

const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  title: '',
})
// 测试视频
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
      if (dialogProps.value.title === '新增') {
        await addLongVideo(dialogProps.value.rowData)
      } else if (dialogProps.value.title === '编辑') {
        await updateLongVideo(dialogProps.value.rowData)
      } else if (dialogProps.value.title === '审核') {
        await authLongVideo(dialogProps.value.rowData)
      } else {
        loading.value = false
        return
      }

      ElMessage.success({
        message: `成功！`,
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

<style lang="scss" scoped>
h3 {
  padding: 0 15px;
}
h3::before {
  position: absolute;
  left: 15px;
  width: 4px;
  height: 18px;
  content: '';
  background-color: #409eff;
}
</style>
