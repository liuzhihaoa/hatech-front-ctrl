<template>
  <div>
    <el-row class="header_row" type="flex" justify="space-between">
      <el-col>微应用管理系统，管理已有微应用信息</el-col>
    </el-row>
  </div>
</template>

<script>
import Page from './config'
export default {
  data() {
    return {
      page: Page.call(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.header_row {
  margin: 10px 0;
  .header_row_right {
    text-align: right;
  }
}
</style>
