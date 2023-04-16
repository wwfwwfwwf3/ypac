<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      class="header-menu"
      mode="horizontal"
    >
      
    
      <el-menu-item index="HomePage" class="home" v-slot="{ active}">
        <router-link to="/" :class="{ 'is-active': active }">Home</router-link>
      </el-menu-item>
      <el-menu-item index="CategoryPage" class="category" v-slot="{ active}">
        <router-link to="/category" :class="{ 'is-active': active }">Category</router-link>
      </el-menu-item>
      <el-menu-item index="UploadPage" class="upload" v-slot="{ active}">
        <router-link to="/upload" :class="{ 'is-active': active }">Upload</router-link>
      </el-menu-item>
      <el-menu-item index="LoginPage" class="login" v-slot="{ active}">
        <router-link to="/login" :class="{ 'is-active': active }">Login</router-link>
      </el-menu-item>
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
