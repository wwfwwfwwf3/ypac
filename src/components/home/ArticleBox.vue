<template>
  <div class="container">
    <el-row gutter="20">
      <el-col :span="8" v-for="article in articles" :key="article.content_id">
        <el-card shadow="always" class="card">
          <img
            :src="`${baseUrl2}${article.imageCover}`"
            alt="cover image"
            class="cover"
          />
          <div class="info">
            <p>
              <router-link :to="'/article/' + article.content_id" class="title">
                {{ article.title }}
              </router-link>
            </p>
            <p>{{ article.introduction }}</p>
            <div>
              <p>date：{{ article.pub_date }}</p>
              <p>likes：{{ article.likeNumber }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import apiService from "@/components/utils/ApiService.js";
import { baseUrl2 } from "@/components/utils/ApiService.js";

export default {
  name: "ArticleBox",

  data() {
    return {
      articles: [],
      baseUrl2: baseUrl2,
    };
  },
  computed: {},
  methods: {
    async fetchArticles() {
      this.articles = await apiService.fetchArticles();
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&display=swap");

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
}

.cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.card {
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 400px; /* Added fixed height */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.title {
  font-family: "Roboto Slab", serif;
  font-size: 20px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
}

.title:hover {
  text-decoration: underline;
}

.info p {
  margin: 0 0 10px;
  color: #555;
}

.info p:nth-child(2) {
  font-size: 14px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* .article-stats {
  display: flex;

  justify-content: space-between;
  align-items: center;
} */
</style>
