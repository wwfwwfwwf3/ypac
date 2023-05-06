<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      class="header-menu"
      mode="horizontal"
    >
      <el-menu-item index="HomePage" class="home">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="CategoryPage" class="category">
        <router-link to="/category">Category</router-link>
      </el-menu-item>
      <el-menu-item index="UploadPage" class="upload">
        <router-link to="/upload">Upload</router-link>
      </el-menu-item>
      <template v-if="$root.loggedInUser">
        <el-dropdown trigger="hover">
          <el-menu-item class="el-dropdown-link">
            {{ $root.loggedInUsername }}
          </el-menu-item>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <el-menu-item index="LoginPage" class="login">
          <router-link to="/login">Login</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: String,
      default: () => "HomePage",
    },
  },
  components: {},
  data() {
    return;
  },
  methods: {
    handleSelect(selectedIndex) {
      this.$emit("selected", selectedIndex);
    },
    handleLogout() {
      console.log("logout=======================================");
      localStorage.removeItem("loggedInUser");
      this.$root.loggedInUser = null;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.header-menu {
  width: 100%;
}

.home {
  width: 28%;
}
.category {
  width: 28%;
}

.upload {
  width: 28%;
}
.login {
  width: 10%;
}
</style>
