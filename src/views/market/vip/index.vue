<!--
 * @Description: vip设置页面
 * @Autor: codeBo
 * @Date: 2023-06-15 16:16:59
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-20 13:34:41
-->
<template>
  <el-card body-style="display: flex;">
    <div class="left_table">
      <el-table :data="identification">
        <el-table-column label="等级名称" prop="showName"></el-table-column>
      </el-table>
    </div>
    <el-table :data="source">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="item.label"
        prop="a"
      ></el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { identification } from './const'
// import { useRoute, useRouter } from 'vue-router'
const source = ref([{ a: 1 }, { b: 2 }])
const columns = ref([
  {
    label: '至尊SSVIP永久卡',
  },
])
</script>

<style lang="scss" scoped>
.left_table {
  width: 150px;
}
</style>
