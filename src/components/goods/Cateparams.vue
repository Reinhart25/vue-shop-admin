<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert class="el-alert" title="只允许为第三级分类设置参数" type="error"></el-alert>
    <!-- 级联选择器 -->
    <el-form class="formcas" label-position="left" label-width="80px">
      <el-form-item label="商品分类">
        <!-- {{ value }} -->
        <el-cascader :show-all-levels="false" clearable v-model="value" :options="options" :props="{
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
              }" @change="handleChange">
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="danger">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrDynamicParams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row, tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name">
          </el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="small" plain @click="showeEditUserDia(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="small" plain @click="showDeleteMsgBox(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button type="danger">设置静态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrStaticparams" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name">
          </el-table-column>
          <el-table-column label="属性值" prop="attr_vals">
          </el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="small" plain @click="showeEditUserDia(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="small" plain @click="showDeleteMsgBox(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'params',
  data () {
    return {
      // 级联选择器绑定的数据
      options: [],
      value: [1, 3, 6],
      // tab 数据
      active: '1',
      // 表格
      arrDynamicParams: [],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      arrStaticparams: []

    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    async handleClose (goods, tag) {
      goods.attr_vals.splice(goods.attr_vals.indexOf(tag), 1)
      const putData = {
        attr_name: goods.attr_name,
        attr_sel: 'many',
        attr_vals: goods.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.value[2]}/attributes/${goods.attr_id}`, putData)
      console.log(res)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm (goods) {
      const inputValue = this.inputValue
      if (inputValue) {
        goods.attr_vals.push(inputValue)
        const putData = {
          attr_name: goods.attr_name,
          attr_sel: 'many',
          attr_vals: goods.attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.value[2]}/attributes/${goods.attr_id}`, putData)
        console.log(res)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // tab 切换时
    async handleClick () {
      if (this.active === '2') {
        if (this.value.length === 3) {
          // 获取静态参数
          const res = await this.$http.get(
            `categories/${this.value[2]}/attributes?sel=only`
          )
          console.log(res)
          this.arrStaticparams = res.data.data
        }
      }
    },
    // 级联选择器改变
    async handleChange () {
      if (this.value.length === 3) {
        // 获取动态参数
        const res = await this.$http.get(
          `categories/${this.value[2]}/attributes?sel=many`
        )
        // console.log(res)
        this.arrDynamicParams = res.data.data
        this.arrDynamicParams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
        })
        console.log(this.arrDynamicParams)
      }
    },
    async getGoodCate () {
      // 获取三级分类数据
      const res = await this.$http.get('categories?type=3')
      // console.log(res)
      this.options = res.data.data
    }
  }
}
</script>

<style>
.el-alert {
  margin-top: 20px;
}
.formcas {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
