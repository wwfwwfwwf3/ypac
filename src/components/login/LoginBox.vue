<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      class="login-form"
    >
      <h3 class="login-title">YPAC</h3>
      <el-form-item label="username" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Input your username"
        ></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="Input your password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <hr />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >Login</el-button
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
      },
      rules: {
        username: [
          { required: true, message: "*Please input your username!", trigger: "blur" },
        ],
        password: [{ required: true, message: "*Please input your password!", trigger: "blur" }],
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
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
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
