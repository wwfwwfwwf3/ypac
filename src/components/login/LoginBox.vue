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
import axios from "axios";
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
      var address = "http://172.20.10.4:8000/denglu/ypac/user_login/";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post(address, this.loginForm)
            .then((response) => {
              console.log("Success");
              console.log(response.data);
              this.$router.push({ path: '/' });
            })
            .catch((error) => {
              console.log("Error");
              console.log(error);
            });
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //尝试json-server用的代码
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/result",
    //     this.loginForm
    //   );
    //   this.posts = response.data;
    //   console.log("OK!");
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    // },
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
