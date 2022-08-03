<template>
  <div class="app_page">
    <hatech-table-page :page="page" @onEvent="onEvent"></hatech-table-page>
  </div>
</template>

<script>
import { HatechTablePage } from 'hatech-web-component-table-page'
import Page from './config'

export default {
  components: { HatechTablePage },
  data() {
    return {
      page: Page.call(this)
    }
  },
  methods: {
    onEvent(args) {
      const { event, params } = args
      const func = this[event]
      if (func && typeof func === 'function') {
        func(params)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app_page {
  position: relative;
  width: 100%;
  height: 100%;
}
.header_row {
  margin: 10px 0;
  .header_row_right {
    text-align: right;
  }
}
</style>
