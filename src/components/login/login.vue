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
      <el-button @click.prevent="handleLogin()" type="primary" class="login-btn"
        >登录</el-button
      >
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
    handleLogin () {
      console.log(this.formdata)
      // axios#post(url[, data[, config]])
      this.$http.post('login', this.formdata).then(response => {
        // 登录成功     不成功
        // 1. 跳转home  1. 提示消息(哪不对)
        // 2. 提示成功
        // console.log(response)
        const {
          data,
          meta: { msg, status }
        } = response.data
        //  登录成功
        if (status === 200) {
          // 1. 跳转home
          this.$router.push({ name: 'home' })
          //  2. 提示成功
          this.$message.success(msg)
          console.log(data)
        } else {
          // 不成功
          // 1. 提示消息(哪不对)
          this.$message.warning(msg)
          console.log(data)
        }
      })
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
