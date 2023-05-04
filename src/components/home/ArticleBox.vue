<template>
  <div>
    <el-row gutter="20">
      <el-col :span="8" v-for="article in articles" :key="article.id">
        <el-card :body-style="{ padding: '0' }">
          <img :src="article.cover" alt="封面图片" class="cover" />
          <div class="info">
            <p>
              <router-link :to="'/article/' + article.id">
              {{ article.title }}
            </router-link>
            </p>
            <p>{{ article.content }}</p>
            <p>上传日期：{{ article.date }}</p>
            <p>点赞数：{{ article.likes }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import apiService from '@/components/utils/ApiService.js'

export default {
  name: "ArticleBox",
  data() {
    return {
      articles: [],
    };
  },
  methods: {
     async fetchArticles() {
     
      this.articles = await apiService.fetchArticles();
    },
  },
  mounted() {
    this.fetchArticles();
  },
  computed: {},
};
</script>

<style scoped>
.cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.info {
  padding: 15px;
}
.info h3 {
  margin: 0 0 15px;
}
.info p {
  margin: 0 0 10px;
}
</style>
