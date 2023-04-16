<template>
  <div>
    <carousel-box></carousel-box>
    <article-box></article-box>
    <router-view></router-view>
    <h1>
      <router-link to="/upload">1111111111</router-link>
      

    </h1>
  </div>
</template>

<script>
import CarouselBox from './CarouselBox.vue';
import ArticleBox from './ArticleBox.vue'

export default {
  name: 'HomePage',
  components:{
    'carousel-box':CarouselBox,
    'article-box':ArticleBox
  },
};
</script>
<style scoped>


</style>
