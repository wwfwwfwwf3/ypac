<template>
  <div>
    <el-card>
      <div>
        <h3>按以下选项排序：</h3>
        <el-radio-group v-model="selectedSort">
          <el-radio-button label="date">日期</el-radio-button>
          <el-radio-button label="views">浏览量</el-radio-button>
          <el-radio-button label="likes">点赞</el-radio-button>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div>
        <h3>选择俱乐部类型：</h3>
        <el-radio-group v-model="selectedCategory">
          <el-radio-button label="sports">运动</el-radio-button>
          <el-radio-button label="cooking">做饭</el-radio-button>
          <el-radio-button label="painting">画画</el-radio-button>
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
