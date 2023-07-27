<template>
  <el-dialog
    v-model="dialogVisible"
    :destroy-on-close="true"
    :append-to-body="true"
    title="视频播放"
    width="60%"
  >
    <div style="width: 100%; height: 430px">
      <div id="player"></div>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="PlayerDialog">
import { ref, nextTick } from 'vue'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
// 定义props类型
interface DialogProps {
  src: string
}

const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  src: '',
})
// 测试视频
// https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  nextTick(() => {
    new Player({
      id: 'player',
      url: params.src,
      poster: 'https://i.imgtg.com/2023/06/27/OkxvQl.png',
      height: '100%',
      width: '100%',
    })
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
