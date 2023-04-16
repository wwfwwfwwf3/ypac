<template>
  <div>
    <choose-box></choose-box>
    <div style="height: 15px;"></div>
    <article-box></article-box>
  </div>
</template>

<script>
import ChooseBox from './ChooseBox.vue'
import ArticleBox from '../home/ArticleBox.vue';
export default {
  name: 'CategoryPage',
  components:{
    'choose-box':ChooseBox,
    'article-box':ArticleBox,
  },
};
</script>
