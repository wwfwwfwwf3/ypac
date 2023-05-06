<template>
  <div class="container">
    <div class="article-header">
      <h2>{{ article.title }}</h2>
    </div>
    <div class="article-meta">
      <span class="author">{{ article.author }}</span> |
      <span class="date">{{ article.pub_date }}</span>
    </div>
    <div class="article-content">
      <video
        v-if="article.video"
        :src="article.video"
        controls
        class="video"
      ></video>
      <div v-html="article.text"></div>
      <img
        :src="`${baseUrl2}/media/${article.payCode}`"
        alt="cover image"
        class="cover"
      />
    </div>
    <div class="actions">
      <el-button icon="el-icon-thumb">Like</el-button>
      <el-button icon="el-icon-warning">Report</el-button>
    </div>

    <div class="comments-section">
      <h3>评论</h3>
      <el-input
        type="textarea"
        v-model="newComment"
        placeholder="请输入您的评论"
        class="comment-input"
      ></el-input>
      <el-button type="primary" @click="submitComment">提交评论</el-button>

      <div class="user-comments">
        <h3>网友评论</h3>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-avatar">
            <img
              src="https://avatars.githubusercontent.com/u/583231?v=4"
              alt="avatar"
              class="avatar"
            />
          </div>
          <div class="comment-content">
            <p>
              <span class="username">{{ comment.fields.user }}</span
              ><br />{{ comment.fields.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import apiService from "@/components/utils/ApiService.js";
import { baseUrl2 } from "@/components/utils/ApiService.js";

export default {
  name: "ArticleContent",
  data() {
    return {
      article: {},
      newComment: "",
      comments: [],
      baseUrl2: baseUrl2,
    };
  },
  methods: {
    submitComment() {
      axios
        .post(
          `http://localhost:3000/articles/${this.$route.params.id}/comments`,
          {
            content: this.newComment,
          }
        )
        .then(() => {
          this.fetchComments();
          this.newComment = "";
        })
        .catch((error) => {
          console.error("Error submitting comment:", error);
        });
    },

    async fetchArticle() {
      this.article = await apiService.fetchArticle(this.$route.params.id);
      console.log("article=============", this.article);
    },
    async fetchComments() {
      this.comments = this.article.comments;
      console.log(
        "comments=============",
        JSON.parse(this.comments)[0].fields.text
      );
    },
    async fetchData() {
      await this.fetchArticle();
      await this.fetchComments();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-header {
  margin-bottom: 20px;
}

.article-header h2 {
  font-size: 24px;
  font-weight: 500;
  color: #333;
}

.article-content {
  margin-bottom: 20px;
}

.video {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.cover {
  display: block;
  width: 30%;
  height: auto;
  margin-top: 20px;
  border-radius: 5px;
}

.actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.actions .el-button {
  margin-right: 10px;
}

.comments-section {
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 10px;
}

.user-comments {
  margin-top: 20px;
}

.comment {
  display: flex;
  align-items: flex-start;
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.comment-avatar {
  flex-shrink: 0;
  margin-right: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.comment-content {
  flex-grow: 1;
}

.username {
  font-weight: bold;
  color: #333;
}

.comment-content p {
  margin: 0;
  color: #555;
}

.article-meta {
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.author {
  font-weight: 500;
  color: #333;
}

.date {
  font-style: italic;
}

</style>
