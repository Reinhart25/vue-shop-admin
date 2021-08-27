<template>
  <el-card>
    <!-- 1. -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 2. el-alert -->
    <el-alert title="添加商品信息" type="success" effect="dark" center show-icon style="margin-top: 20px; margin-bottom: 20px;"></el-alert>

    <!-- 3.步骤条 -->
    <el-steps :active="1 * active" finish-status="success" simple style="margin-top: 20px;">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 4. 标签页  -->
    <!-- {{ active }} -->
    <el-form label-position="top" label-width="80px" :model="form" style="height: 400px; overflow: auto;">
      <el-tabs @tab-click="tabChange()" v-model="active" tab-position="left" style="margin-top: 15px;">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- {{ value }} -->
            <el-cascader clearable v-model="value" :options="options" :props="{
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
              }" @change="handleChange"></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item v-for="(item1, i) in arrDynamicParams" :label="item1.attr_name" :key="i">
            <el-checkbox-group v-model="item1.attr_vals" v-for="(item2, i) in item1.attr_vals" :key="i">
              <el-checkbox border :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload class="upload-demo" action="http://127.0.0.1:8888/api/private/v1/upload" :headers="headers" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods()">点我-添加商品</el-button>
            <!-- 富文本 -->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'goodsAdd',
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        goods_cat: '',
        pics: [],
        attrs: []
      },
      // 级联选择器绑定的数据
      options: [],
      value: [1, 3, 6],
      // 动态参数的数据数组
      arrDynamicParams: [],
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 添加商品 - 发送请求
    async addGoods () {
      this.form.goods_cat = this.value.join(',')
      this.form.attrs = this.arrDynamicParams + this.arrStaticparams
      // 在发请求之前 处理this.form 的未处理数据
      const res = await this.$http.post('goods', this.form, {
        header: this.headers
      })
      console.log(res)
    },
    // file 形参里面是当前操作的图片的相关信息(图片名/图片路径)
    handleSuccess (file) {
      this.form.pics.push({
        pic: file.data.tmp_path
      })
      // console.log(response, file, fileList)
    },
    handleRemove (file) {
      // file.response.data.tmp_path 图片临时上传的路径
      console.log('移除')
      // 从 this.form.pics 移除当前x掉的图片
      const Index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      })
      this.form.pics.splice(Index, 1)
      console.log(this.form.pics)
    },
    handlePreview (file) {
      // console.log('成功')
      // console.log(file)
    },
    // 点击不同的tab时
    async tabChange () {
      // 如果点击的是第二个tab触发 同时 三级分类要有值
      if (this.active === '2') {
        if (this.value.length !== 3) {
          // 提示
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        // 获取数据
        const res = await this.$http.get(
          `categories/${this.value[2]}/attributes?sel=many`
        )
        console.log(res)
        // attr_name attr_vals
        this.arrDynamicParams = res.data.data
        // this.arrDynamicParams 每个对象.attr_vals 字符串 -> 数组 -> v-for
        this.arrDynamicParams.forEach(item => {
          // 并不是所有的三级分类都有动态参数
          // if (item.attr_vals.length !== 0) {
          //   item.attr_vals = item.attr_vals.trim().split(',')
          // }
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
        })
      } else if (this.active === '3') {
        if (this.value.length !== 3) {
          // 提示
          this.$message.warning('请先选择商品的三级分类')
          // return
        }
        // 获取静态参数的数据
        const res = await this.$http.get(
          `categories/${this.value[2]}/attributes?sel=only`
        )
        console.log(res)
        this.arrStaticparams = res.data.data
      }
    },
    async getGoodCate () {
      // 获取三级分类数据
      const res = await this.$http.get('categories?type=3')
      // console.log(res)
      this.options = res.data.data
    },
    handleChange () {
      //
    }
  }
}
</script>

<style>
.ql-editor {
  min-height: 300px;
}
</style>
