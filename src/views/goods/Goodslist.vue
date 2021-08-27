<template>
  <el-card class="box-card">
    <!-- 1. -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 2. 搜索框 -->
    <el-row class="input-search">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="query" clearable @clear="loadGoodsList">
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" class="btn-success">
        <el-button type="success" @click="$router.push({ name: 'goodsAdd' })">
          添加商品
        </el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="goodsList" stripe style="width: 100%;" highlight-current-row>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建日期">
        <!-- :formatter="formatter" -->
        <template slot-scope="scope">
          {{ scope.row.add_time | formmatdate }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="small" plain @click="showeEditGoodsDia(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" plain @click="showDeleteGoodsMsgBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4. 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[6, 12, 18]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </el-card>
</template>

<script>
export default {
  naem: 'goods',
  data () {
    return {
      total: -1,
      query: '',
      pagenum: 1,
      pagesize: 6,
      goodsList: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 改变之后重新更新视图自动回到1
      // this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`) currentChange事件传递一个参数
      this.pagenum = val
      this.getGoodsList()
    },
    showDeleteGoodsMsgBox () {
      //
    },
    showeEditGoodsDia () {
      //
    },
    loadGoodsList () {
      //
    },
    searchGoods () {
      //
    },
    async getGoodsList () {
      // type[1,2,3]
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      // console.log(res)
      const {
        meta: { status, msg },
        data: { goods, total }
      } = res.data
      if (status === 200) {
        // 1. 给表格数据赋值
        this.goodsList = goods
        // 2. 给total 赋值
        this.total = total
        // 3. 提示
        // this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style></style>
