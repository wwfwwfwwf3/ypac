<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      class="login-form"
    >
      <h3 class="login-title">登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
        <hr />
        <span class="forgot-password">忘记密码？</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiService from "../utils/ApiService.js";
export default {
  components: {
    // axios,
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        // rememberMe: false,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  inject: ['eventBus'],

  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await apiService.login(this.loginForm);
            console.log('登录成功：', response);
            this.$root.setLoggedInUser(response);
            this.$router.push({ path: '/' });
          } catch (error) {
            console.error('登录失败：', error);
          }
        } else {
          console.error('表单验证失败');
          return false;
        }
      });
    }, 
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.forgot-password {
  float: right;
  color: #409eff;
  cursor: pointer;
}
</style>
