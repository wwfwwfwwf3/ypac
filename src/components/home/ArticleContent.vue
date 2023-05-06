<template>
  <div>
    <h2>{{ article.title }}</h2>
    <video v-if="article.video" :src="article.video" controls></video>
    <div v-html="article.text"></div>
    <img :src="`${ baseUrl2 }/media/${ article.payCode }`" alt="cover image" class="cover" height="400" width="300"/>
    <div>
      <el-button> like</el-button>
      <el-button> report</el-button>
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
import apiService from "@/components/utils/ApiService.js";
import {baseUrl2} from "@/components/utils/ApiService.js";

export default {
  
  name: "ArticleContent",
  data() {
    return {
      article: {},
      newComment: '',
      comments: [],
      baseUrl2:baseUrl2,
    };
  },
  methods: {
    
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
    },

    async fetchArticle() {
      this.article = await apiService.fetchArticle(this.$route.params.id);
      console.log("article=============",this.article);
    },
    async fetchComments() {
      this.comments = await apiService.fetchComments(this.$route.params.id);
    },
    async fetchData() {
      await this.fetchArticle();
      await this.fetchComments();
    },
  },
  mounted() {
    this.fetchData();
  },
}
</script>
