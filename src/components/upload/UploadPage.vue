<template>
  <div>
    <upload-box></upload-box>
  </div>
</template>

<script>
import UploadBox from './UploadBox.vue';
export default {
  name: 'UploadPage',
  components:{
    'upload-box':UploadBox,
  },
};
</script>
