<template>
<div class="carousel-container">
    <el-carousel type="card" height="200px" width="80%">
      
      <el-carousel-item>
        <img src="https://via.placeholder.com/800x200" alt="slide1" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="https://via.placeholder.com/800x200" alt="slide2" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="https://via.placeholder.com/800x200" alt="slide3" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: "CarouselBox",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  // mounted() {
  //   this.getSlideList();
  // },
  // getSlideList () {
  //   axios.get('/api/slides')
  //     .then(res => {
  //       this.slideList = res.data;
  //     })
  //     .catch(err => console.log(err));
  // },
};
</script>

<style scoped>
.carousel-container {
    width: 100%;
}
.carousel-img{
    max-width: 100%;
    max-height: 100%;
}
</style>

