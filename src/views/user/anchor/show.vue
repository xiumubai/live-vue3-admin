<template>
  <el-card shadow="never" body-style="border: none;">
    <template #header>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3">【主播】详情页面</span>
        </template>
      </el-page-header>
    </template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="直播记录" name="first">
        <ProTable
          :columns="columns1"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getLiveRecordList"
        ></ProTable>
      </el-tab-pane>
      <el-tab-pane label="认证信息" name="second">
        <el-form label-width="120px" label-suffix=" :">
          <el-form-item label="真实姓名">
            <span>{{ authMsg?.name }}</span>
          </el-form-item>
          <el-form-item label="出生年月">
            <span>{{ authMsg?.birthday }}</span>
          </el-form-item>
          <el-form-item label="身份证照片">
            <div v-for="url in authMsg?.idCardUrl" :key="url" class="block">
              <el-image
                style="width: 150px; margin-right: 15px"
                :src="url"
                :preview-src-list="authMsg?.idCardUrl"
              />
            </div>
          </el-form-item>
          <el-form-item label="申请时间">
            <span>{{ authMsg?.time }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ authMsg?.remark }}</span>
          </el-form-item>
          <el-form-item label="认证意见">
            <span>{{ authMsg?.status }}</span>
          </el-form-item>
          <el-form-item label="认证备注">
            <span>{{ authMsg?.authRemark }}</span>
          </el-form-item>
          <el-form-item label="认证人">
            <span>{{ authMsg?.author }}</span>
          </el-form-item>
          <el-form-item label="认证时间">
            <span>{{ authMsg?.authTime }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getLiveRecordList, getAuthDetail } from '@/api/user/anchor'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeName = ref('first')
// *查询参数
const initParam = reactive({
  id: route.params.id,
})

// 主播认证信息
let authMsg = ref()

/** 返回 */
const goBack = () => {
  router.back()
}

// *表格配置项
const columns1: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'title', label: '标题' },
  { prop: 'type', label: '视频类型' },
  { prop: 'time', label: '时长' },
  { prop: 'liveStatus', label: '直播状态' },
  { prop: 'num', label: '观看人数' },
  { prop: 'ammount', label: '打赏金额' },
  { prop: 'createTime', label: '开播时间' },
]

onMounted(async () => {
  const result = await getAuthDetail(route.params.id as string)
  authMsg.value = result.data
})
</script>

<style scoped></style>
