<template>
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
      loggedInUser: null,
    };
  },

  methods: {
    handleSelect(selectedIndex) {
      this.activeIndex = selectedIndex;
      this.$router.push({ name: selectedIndex });
    },

    setLoggedInUser(user) {
      this.loggedInUser = user;
      this.$root.loggedInUsername = user.username;
      this.$root.userType = user.userType;

      console.log("userType====================", user.userType);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    },
  },

  computed: {
    loggedInUsername() {
      return this.loggedInUser?.username || null;
    },
  },

  mounted() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      this.setLoggedInUser(JSON.parse(loggedInUser));
    }
  },
};
</script>

<style>
#app {
  width: 100%;
  background-image: linear-gradient(-225deg, #fffeff 0%, #d7fffe 100%);
}
</style>
