<template>
  <el-card shadow="never" body-style="border: none;">
    <template #header>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3">【长视频】详情页面</span>
        </template>
      </el-page-header>
    </template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="视频数据" name="first">
        <ProTable
          :columns="columns1"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getVideoRecordList"
        ></ProTable>
      </el-tab-pane>
      <el-tab-pane label="付费列表" name="second">
        <ProTable
          :columns="columns2"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getVideoPayList"
        ></ProTable>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getVideoRecordList, getVideoPayList } from '@/api/content/longVideo'
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
  { prop: 'viewNum', label: '浏览量' },
  { prop: 'likeNum', label: '点赞数' },
  { prop: 'favoNum', label: '收藏数' },
  { prop: 'sharenum', label: '分享数' },
  { prop: 'downNum', label: '下载数' },
  { prop: 'commentNum', label: '评论数' },
]

const columns2: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'type', label: '交易类型' },
  { prop: 'ammount', label: '交易金额' },
  { prop: 'status', label: '交易状态' },
  { prop: 'name', label: '购买人' },
  { prop: 'phone', label: '手机号' },
  { prop: 'createTime', label: '时间' },
]
</script>

<style scoped></style>
