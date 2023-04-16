<template>
  <div>
    <carousel-box></carousel-box>
    <article-box></article-box>
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
