<template>
  <el-card>
    <!-- 1. -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 2. 按钮 -->
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="addGoodsCate()">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="list" stripe style="width: 100%;" highlight-current-row>
      <el-tree-grid width="300" prop="cat_name" label="分类名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children"></el-tree-grid>

      <el-table-column label="级别" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">二级</span>
          <span v-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>

      <el-table-column label="是否有效" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-else-if="scope.row.cat_deleted===true">无效</span>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[6, 12, 18]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- 2.1 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          {{ value }}
          <el-cascader clearable v-model="value" :options="options" :props="{
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
              }" @change="handleChange()">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
var ElTreeGrid = require('element-tree-grid')
// Vue.component(ElTreeGrid.name, ElTreeGrid)
export default {
  name: '',
  components: {
    ElTreeGrid
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: -1
      },
      formLabelWidth: '120px',
      // 级联选择器绑定的数据
      options: [],
      value: [1, 3],
      // 表格绑定的数据
      list: [],
      // 分页相关数据
      pagenum: 1,
      pagesize: 6,
      total: -1
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 表格操作相关方法
    showeEditGoodsDia () {
      //
    },
    showDeleteGoodsMsgBox () {
      //
    },
    // 分页相关方法
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 改变之后重新更新视图自动回到1
      // this.pagenum = 1
      this.getCateList()
    },
    // 分类相关-> 处理当前页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getCateList()
    },
    // 添加分类-显示对话框
    addGoodsCate () {
      this.getGoodCate()
      this.dialogFormVisible = true
    },
    async getGoodCate () {
      // 获取对话框三级分类数据
      const res = await this.$http.get('categories?type=2')
      // console.log(res)
      this.options = res.data.data
    },
    // 添加分类-发送请求
    async addCate () {
      // 3种情况
      // 1. value.length === 0 cat_pid=0 cat_level=0
      // 2. value.length === 1 cat_pid=value[0] cat_level=1
      // 3. value.length === 2 cat_pid=value[1] cat_level=2
      if (this.value.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else if (this.value.length === 1) {
        this.form.cat_pid = this.value[0]
        this.form.cat_level = 1
      } else if (this.value.length === 2) {
        this.form.cat_pid = this.value[1]
        this.form.cat_level = 2
      }
      const res = await this.$http.post('categories', this.form)
      console.log(res)
      // 更新视图
      this.getCateList()
      // 关闭对话框
      this.dialogFormVisible = false
      // 清空from
      this.form = {}
    },
    async getCateList () {
      // 表格数据
      const res1 = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res1)
      this.list = res1.data.data.result
      this.total = res1.data.data.total
    },
    handleChange () {
      //
    }
  }
}
</script>

<style>
.searchArea {
  margin-top: 20px;
}
</style>
