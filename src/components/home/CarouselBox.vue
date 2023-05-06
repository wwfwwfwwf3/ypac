<template>
<div class="carousel-container">
    <el-carousel type="card" height="200px" width="80%">
      
      <el-carousel-item>
        <img src="https://img1.baidu.com/it/u=3632688648,2518551699&fm=253&fmt=auto&app=138&f=GIF?w=800&h=200" alt="slide1" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="https://img2.baidu.com/it/u=1481630677,2258820518&fm=253&fmt=auto&app=138&f=GIF?w=800&h=200" alt="slide2" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="https://img1.baidu.com/it/u=418183704,3260596992&fm=253&fmt=auto&app=120&f=GIF?w=800&h=200" alt="slide3" />
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

