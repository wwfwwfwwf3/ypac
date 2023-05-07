<!--ChooseBox.vue-->
<template>
  <div class="container1">
    <el-card class="container2">
      <div>
        <h3>Order the following options:</h3>
        <el-radio-group v-model="selectedSort">
          <el-radio-button label="date">date</el-radio-button>
          <el-radio-button label="views">views</el-radio-button>
          <el-radio-button label="likes">likes</el-radio-button>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div>
        <h3>Select club type</h3>
        <el-radio-group v-model="selectedCategory">
          <el-radio-button label="sports">sprots</el-radio-button>
          <el-radio-button label="cooking">cooking</el-radio-button>
          <el-radio-button label="painting">painting</el-radio-button>
          <el-radio-button label="music">Music</el-radio-button>
          <el-radio-button label="movies">Movies</el-radio-button>
          <el-radio-button label="books">Books</el-radio-button>
          <el-radio-button label="technology">Technology</el-radio-button>
          <el-radio-button label="politics">Politics</el-radio-button>
          <el-radio-button label="fashion">Fashion</el-radio-button>
          <el-radio-button label="travel">Travel</el-radio-button>
          <el-radio-button label="business">Business</el-radio-button>
          <el-radio-button label="other">Other</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectedSort: "",
      selectedCategory: "",
      
    };
  },
};
</script>
<style scoped>
.container1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container2 {
  width: 82%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>