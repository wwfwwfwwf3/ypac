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
      <button class="action-button like-button">
        <svg viewBox="0 0 24 24" class="icon">
          <path
            d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
          ></path>
        </svg>
        Like
      </button>
    </div>

    <div class="comments-section">
      <h3>Comment</h3>
      <el-input
        type="textarea"
        v-model="newComment"
        placeholder="Input your comment"
        class="comment-input"
      ></el-input>
      <el-button type="primary" @click="submitComment"
        >Submit Comment</el-button
      >

      <div class="user-comments">
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
    async submitComment() {
      if (!this.$root.loggedInUsername) {
        this.$message({
          message: "Please log in to submit a comment",
          type: "warning",
        });
        return;
      }
      try {
        const commentData = {
          content_id: this.$route.params.id,
          username: this.$root.loggedInUsername,
          text: this.newComment,
        };
        await apiService.submitComment(commentData);
        this.fetchComments();
        this.newComment = "";
        this.$message({
          message: "Comment submitted successfully!",
          type: "success",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error submitting comment:", error);
        this.$message({
          message: "Failed to submit comment, please try again",
          type: "error",
        });
      }
    },

    async fetchArticle() {
      this.article = await apiService.fetchArticle(this.$route.params.id);
      console.log("article=============", this.article);
    },
    async fetchComments() {
      this.comments = this.article.comments;
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

.action-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 8px 12px;
  margin-right: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #333;
  color: #fff;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  fill: currentColor;
}

.like-button {
  display: flex;
  align-items: center;
}

.share-button {
  display: flex;
  align-items: center;
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
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
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
