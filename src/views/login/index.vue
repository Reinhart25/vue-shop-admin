<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent="handleLogin()"
        type="primary"
        class="login-btn"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    async handleLogin () {
      // -> 希望 让异步操作的代码 看起来像同步代码(为什么：有嵌套关系，大括号就多，看起来就不舒服)
      // -> ES7 async + await (需要用到)
      console.log(this.formdata)
      // axios#post(url[, data[, config]])
      const res = await this.$http.post('login', this.formdata)
      // console.log(response)
      const {
        data,
        meta: { msg, status }
      } = res.data
      //  登录成功
      if (status === 200) {
        // 0. 保存token -> 目的：如果用户没登录 -> url 直接来到home 组件
        // 在登录成功时， 保存正确用户的token
        localStorage.setItem('token', data.token)
        // 1. 跳转home  js编程式导航
        this.$router.push({ path: '/home' })
        //  2. 提示成功
        this.$message.success(msg)
        console.log(data)
      } else {
        // 不成功
        // 1. 提示消息(哪不对)
        this.$message.warning(msg)
        console.log(data)
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: slategrey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
