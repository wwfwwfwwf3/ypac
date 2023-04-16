<template>
  <div>
    <login-box></login-box>
    <clubinfo-box></clubinfo-box>
  </div>
</template>

<script>
import LoginBox from './LoginBox.vue';
import ClubInfoBox from '../community/ClubInfoBox.vue';

export default {
  name: 'LoginPage',
  components:{
    'login-box':LoginBox,
    'clubinfo-box':ClubInfoBox,
  },
};
</script>