<!--
 * @Description: 弹窗啊呜呜
 * @Autor: codeBo
 * @Date: 2023-06-16 16:45:55
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 17:07:56
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
      <el-form-item label="礼物名称" prop="advertisingName">
        <el-input
          v-model="drawerProps.rowData.advertisingName"
          placeholder="请输入，限制30字符"
          clearable
        />
      </el-form-item>
      <el-form-item label="图标" prop="smallPic">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择图片</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              文件支持扩展名： .jpg/.png 文件大小限制： 大于2M小于5M
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model="drawerProps.rowData.price"
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
import { genFileId, ElMessage } from 'element-plus'
import type {
  FormInstance,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from 'element-plus'
interface DrawerProps {
  title: string
  rowData?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const uploadRef = ref<UploadInstance>()
const loading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  advertisingName: [
    { required: true, message: '请填写广告名称' },
    { max: 30, message: '广告名称30字符以内' },
  ],
  smallPic: [{ required: true, message: '请填排序值' }],
  price: [{ required: true, message: '请填排序值' }],
})
// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})
// 第二个文件替换第一个文件
const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}
//TODO 没有执行
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)

  if (rawFile.type !== 'png/jpeg/jpg') {
    ElMessage.error('文件格式必须是.jpg或.png!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5 || rawFile.size / 1024 / 1024 < 2) {
    ElMessage.error('文件大小应该在2MB-5MB之间!')
    return false
  }
  return true
}
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
