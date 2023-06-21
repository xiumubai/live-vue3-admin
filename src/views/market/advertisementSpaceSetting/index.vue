<!--
 * @Description: 广告位设置页面
 * @Autor: codeBo
 * @Date: 2023-06-15 16:16:59
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-19 17:29:48
-->
<template>
  <el-card v-loading="pageLoading">
    <el-form :model="form" label-width="150px">
      <h3>长视频页</h3>
      <el-form-item label="顶部广告是否开启">
        <el-switch v-model="form.topAdvertising" />
      </el-form-item>
      <el-form-item label="轮播图下方是否开启">
        <el-switch v-model="form.swpperBottom" />
      </el-form-item>
      <el-form-item label="首页广告频率">
        <el-input-number
          :min="1"
          v-model="form.homeAdvertisingFrequency"
          size="small"
        />
        &nbsp;/每个栏目
      </el-form-item>
      <el-form-item label="播放页视频下方">
        <el-switch v-model="form.playVideoBottom" />
      </el-form-item>
      <el-form-item label="评论下方">
        <el-switch v-model="form.commentBottom" />
      </el-form-item>
      <el-form-item label="为你推荐评率">
        <el-input-number
          :min="1"
          v-model="form.forYouCommentAdvertising"
          size="small"
        />
        &nbsp;个视频显示一个广告
      </el-form-item>
      <h3>短视频页</h3>
      <el-form-item label="每">
        <el-input-number
          :min="1"
          v-model="form.everyShortVideoAdvertising"
          size="small"
        />
        &nbsp;个视频显示一个广告
      </el-form-item>
      <h3>社区帖子</h3>
      <el-form-item label="每">
        <el-input-number
          :min="1"
          v-model="form.everyShortVideoAdvertising"
          size="small"
        />
        &nbsp;个帖子显示一个广告
      </el-form-item>
      <h3>直播广告</h3>
      <el-form-item label="每">
        <el-input-number
          :min="1"
          v-model="form.everyLiveCoverAdvertising"
          size="small"
        />
        &nbsp;个直播封面显示一个广告
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
  getAdSpaceSettingList,
  updateAdSpaceSettingList,
} from '@/api/market/advertisementSpaceSetting'
import type { AdSpaceSetting } from '@/api/market/types'
import { ElMessage } from 'element-plus'

// import { useRoute, useRouter } from 'vue-router'
const pageLoading = ref(false)
pageLoading.value = true
const form = ref<AdSpaceSetting.Data>({
  topAdvertising: true,
  swpperBottom: true,
  homeAdvertisingFrequency: 1,
  playVideoBottom: true,
  commentBottom: true,
  forYouCommentAdvertising: 1,
  everyShortVideoAdvertising: 1,
  everyInvitationAdvertising: 1,
  everyLiveCoverAdvertising: 1,
})
getAdSpaceSettingList()
  .then((res) => {
    form.value = res.data
  })
  .finally(() => {
    pageLoading.value = false
  })
const updateList = () => {
  pageLoading.value = true
  updateAdSpaceSettingList(form.value)
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
