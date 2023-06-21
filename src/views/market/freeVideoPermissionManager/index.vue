<!--
 * @Description: 免费视频权限设置页面
 * @Autor: codeBo
 * @Date: 2023-06-15 16:16:59
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 16:20:36
-->
<template>
  <el-card v-loading="pageLoading">
    <el-form :model="form" label-width="180px">
      <h3>游客</h3>
      <el-form-item label="每日免费长视频次数">
        <el-input-number
          :min="1"
          v-model="form.visitorFreeLongVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="每日免费短视频次数">
        <el-input-number
          :min="1"
          v-model="form.visitorFreeShortVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="是否可分享视频">
        <el-switch v-model="form.visitorShare" />
      </el-form-item>
      <h3>普通用户</h3>
      <el-form-item label="每日免费长视频次数">
        <el-input-number
          :min="1"
          v-model="form.userFreeLongVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="每日免费短视频次数">
        <el-input-number
          :min="1"
          v-model="form.userFreeShortVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="每日离线缓存视频次数">
        <el-input-number
          :min="1"
          v-model="form.userOfflineCacheVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="每日下载视频次数">
        <el-input-number
          :min="1"
          v-model="form.userDownloadVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="是否可分享视频">
        <el-switch v-model="form.userShare" />
      </el-form-item>
      <h3>通用配置</h3>
      <el-form-item label="长视频试看时长（分钟）">
        <el-input-number
          :min="1"
          v-model="form.generalSeeLongVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="短视频试看时长（分钟）">
        <el-input-number
          :min="1"
          v-model="form.generalSeeShortVideo"
          size="small"
        />
      </el-form-item>
      <el-form-item label="VIP权限开关">
        <el-switch v-model="form.vipSwitch" />
        &nbsp;&nbsp; 关闭VIP权限开关后普通用户 也可以行使VIP权限
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: center">
      <el-button type="primary" @click="updateList">保存</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  getFreeVideoPermission,
  updateFreeVideoPermission,
} from '@/api/market/freeVideoPermissionManager'
import type { FreeVideoPermission } from '@/api/market/types'
import { ElMessage } from 'element-plus'

// import { useRoute, useRouter } from 'vue-router'
const pageLoading = ref(false)
pageLoading.value = true
const form = ref<FreeVideoPermission.Data>({
  visitorFreeLongVideo: 1,
  visitorFreeShortVideo: 1,
  visitorShare: false,
  userFreeLongVideo: 1,
  userFreeShortVideo: 1,
  userOfflineCacheVideo: 1,
  userDownloadVideo: 1,
  userShare: false,
  generalSeeLongVideo: 1,
  generalSeeShortVideo: 1,
  vipSwitch: false,
})
getFreeVideoPermission()
  .then((res) => {
    form.value = res.data
  })
  .finally(() => {
    pageLoading.value = false
  })
const updateList = () => {
  pageLoading.value = true
  updateFreeVideoPermission(form.value)
    .then((res) => {
      form.value = res.data
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    })
    .finally(() => {
      pageLoading.value = false
    })
}
</script>

<style lang="scss" scoped></style>
