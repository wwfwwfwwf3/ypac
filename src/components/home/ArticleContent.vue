<template>
  <div>
    <h2>{{ article.title }}</h2>
    <div v-html="article.content"></div>
    <div>
      <el-button icon="el-icon-thumb">点赞</el-button>
      <el-button icon="el-icon-share">分享</el-button>
      <el-button icon="el-icon-gift">打赏</el-button>
    </div>
    <div>
      <h3>评论</h3>
      <el-input
        type="textarea"
        v-model="newComment"
        placeholder="请输入您的评论"
      ></el-input>
      <el-button type="primary" @click="submitComment">提交评论</el-button>
    </div>
    <div>
      <h3>网友评论</h3>
      <div v-for="comment in comments" :key="comment.id">
        <p>{{ comment.username }}: {{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ArticleContent",
  data() {
    return {
      article: {},
      newComment: '',
      comments: []
    };
  },
  methods: {
    // ...
    fetchComments() {
      axios.get(`http://localhost:3000/articles/${this.$route.params.id}/comments`)
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    },
    submitComment() {
      axios.post(`http://localhost:3000/articles/${this.$route.params.id}/comments`, {
        content: this.newComment
      })
        .then(()=> {
          this.fetchComments();
          this.newComment = '';
        })
        .catch(error => {
          console.error('Error submitting comment:', error);
        });
    }
  },
  mounted() {
    this.fetchArticle();
    this.fetchComments();
  },
}
</script>
