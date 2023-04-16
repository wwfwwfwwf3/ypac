<!-- <template>
  <div id="app">
    <el-container>
      <el-header>
        <page-header @selected="handleSelect" :activeIndex="activeIndex"
          >s</page-header
        >
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      
    </el-container>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/upload">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";

export default {
  name: "App",
  components: {
    "page-header": PageHeader,
  },

  data() {
    return {
      activeIndex: "HomePage",
    };
  },

  watch: {
    $route(to) {
      this.activeIndex = to.name;
      console.log(to.name);
    },
  },


  methods: {
    handleSelect(selectedIndex) {
      this.activeIndex = selectedIndex;
      this.$router.push({ name: selectedIndex });
    },
  },
};
</script>

<style>
#app {
  width: 100%;
}
</style> -->
<!-- src/App.vue -->


<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* 在这里添加样式 */
</style>
