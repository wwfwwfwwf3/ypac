<template>
  <el-header>
    <nav class="navbar">
      <div class="nav-container left">
        <router-link to="/" class="nav-link home">Home</router-link>
        <router-link to="/category" class="nav-link category"
          >Category</router-link
        >
        <!-- <template v-if="$root.userType === '1'"> -->
          <router-link
          v-if="$root.userType === '1'"
            to="/upload"
            class="nav-link upload"
            :key="$root.userType"
            >Upload</router-link
          >
        <!-- </template> -->
      </div>
      <div class="nav-container right">
        <template v-if="$root.loggedInUser">
          <el-dropdown trigger="hover">
            <span class="nav-link username">{{ $root.loggedInUsername }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout"
                  >Logout</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link login">Login</router-link>
        </template>
      </div>
    </nav>
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
  computed: {
    userType() {
      return this.$root.userType || null;
    },
  },
  methods: {
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
.el-header {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  padding: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-container.left {
  flex-grow: 1;
}
.nav-container.right {
  flex-shrink: 0;
}
.nav-link {
  flex-grow: 1;
  text-align: center;
  border-bottom: none;
  text-decoration: none;
}

.nav-link:hover {
  color: #0084ff;
}

.username {
  font-weight: bold;
  cursor: pointer;
}

.el-dropdown-menu {
  font-size: 16px;
}

.el-dropdown-menu__item:hover {
  background-color: #f0f0f0;
}
</style>
