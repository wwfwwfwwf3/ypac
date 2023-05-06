<template>
  <div>
    <login-box></login-box>
  </div>
</template>

<script>
import LoginBox from './LoginBox.vue';

export default {
  name: 'LoginPage',
  components:{
    'login-box':LoginBox,
  },
};
</script>