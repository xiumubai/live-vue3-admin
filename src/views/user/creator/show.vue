<template>
  <el-card shadow="never" body-style="border: none;">
    <template #header>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3">【创作者】详情页面</span>
        </template>
      </el-page-header>
    </template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="长视频" name="first">
        <ProTable
          :columns="columns1"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getLongVideoList"
        ></ProTable>
      </el-tab-pane>
      <el-tab-pane label="短视频" name="second">
        <ProTable
          :columns="columns1"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getShortVideoList"
        ></ProTable>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getLongVideoList, getShortVideoList } from '@/api/user/creator'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const activeName = ref('first')
// *查询参数
const initParam = reactive({
  id: route.params.id,
})

const goBack = () => {
  router.back()
}

// *表格配置项
const columns1: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'type', label: '视频类型' },
  { prop: 'title', label: '标题' },
  { prop: 'time', label: '时长' },
  { prop: 'authStatus', label: '审核状态' },
  { prop: 'createTime', label: '添加时间' },
]
</script>

<style scoped></style>
