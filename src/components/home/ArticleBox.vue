<template>
  <div>
    <el-row gutter="20">
      <el-col :span="8" v-for="article in articles" :key="article.content_id">
        <el-card :body-style="{ padding: '0' }">
          <img :src="'http://172.20.10.2:8000'+article.imageCover" alt="cover image" class="cover" />
          <div class="info">
            <p>
              <router-link :to="'/article/' + article.content_id">
                {{ article.title }}
              </router-link>
            </p>
            <p>{{ article.introduction }}</p>
            <p>date：{{ article.pub_date }}</p>
            <p>likes：{{ article.likeNumber }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import apiService from "@/components/utils/ApiService.js";

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
