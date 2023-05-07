// ApiService.js
import axios from "axios";

export const baseUrl1 = 'http://localhost:3000';
export const baseUrl2 = 'http://172.20.10.2:8000';

class ApiService {
  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }

    ApiService.instance = this;
  }

  async fetchArticles() {
    const address = baseUrl2 + "/cms/ypac/content_list/ ";
    // const address=baseUrl1+"/articles";
    try {
      const response = await axios.get(address);
      console.log("fetchArticles:", response.data, '\n');
      return response.data;
    } catch (error) {
      console.log("Error====================================");
      console.error("Error fetching articles:", error);
    }
  }

  async login(credentials) {
    const address = baseUrl2 + "/cms/ypac/user_login/";
    try {
      const response = await axios.post(address, credentials);
      console.log("LoginInfo=====================", response.data, '\n');
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No response==========================');
      }
    } catch (error) {
      console.error('登录失败：', error);
      throw error;
    }
  }

  async fetchArticle(id) {
    // const address = baseUrl1+`/articles/${id}`;
    const address = baseUrl2 + `/cms/ypac/content_detail/`
    try {
      const response = await axios.post(address, {
        "content_id": id
      });
      // const response = await axios.get(address);

      console.log("fetchArticle===============================", response.data, '\n');
      return response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  }

  async fetchComments(articleId) {
    // const address = baseUrl1+`/articles/${articleId}/comments`;
    const address = baseUrl2 + `/cms/ypac/comment_list/`
    try {
      // const response = await axios.get(address);
      const response = await axios.post(address, {
        "content_id": articleId
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async submitArticle(formData) {
    console.log("submitArticle===============================", formData, '\n');
    try {
      const address = `${baseUrl2}/cms/ypac/content_list/`;
      const response = await axios.post(address, formData);
      if (response.status === 200 || response.status === 201) {
        return { success: true };
      } else {
        console.error("response.status==" + response.status);
        return { success: false, error: "提交失败，请稍后重试" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "提交失败，请稍后重试" };
    }
  }

  async submitComment(commentData) {
    const address = baseUrl2 + `/cms/ypac/comment_content/`;
    try {
      const response = await axios.post(address, {
        content_id: commentData.content_id,
        username: commentData.username,
        text: commentData.text,
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }

  async likeArticle(likeData) {
    const address = baseUrl2 + `/cms/ypac/like_content/`;
    try {
      const response = await axios.post(
        address,likeData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  }

}

const apiService = new ApiService();
export default apiService;
