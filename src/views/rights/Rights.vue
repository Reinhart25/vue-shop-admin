<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 2. 表格 -->
    <el-table class="rightsList" height="600" :data="rightlist" border style="width: 100%">
      <el-table-column type="index" label="#" width="100px"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200px"> </el-table-column>
      <el-table-column prop="path" label="路径" width="200px"> </el-table-column>
      <el-table-column prop="level" label="层级" width="200px">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'rights',
  data () {
    return {
      rightlist: []
    }
  },
  created () {
    this.getRightlist()
  },
  methods: {
    async getRightlist () {
      // - 请求路径：rights/:type   - 请求方法：get
      const res = await this.$http.get('rights/list')
      console.log(res)
      this.rightlist = res.data.data
    }
  }
}
</script>

<style>
.rightsList{
  margin-top: 20px;
}
</style>
