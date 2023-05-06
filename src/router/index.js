import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/home/HomePage.vue";
import LoginPage from "../components/login/LoginPage.vue";
import CategoryPage from "../components/category/CategoryPage.vue";
import UploadPage from "../components/upload/UploadPage.vue";
import ArticleContent from "../components/home/ArticleContent.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/category", name: "CategoryPage", component: CategoryPage },
  { path: "/upload", name: "UploadPage", component: UploadPage },
  { path: '/article/:id',name:"ArticleContent", component: ArticleContent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  
});
export default router;

