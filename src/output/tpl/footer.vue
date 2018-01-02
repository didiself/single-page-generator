<template lang="pug">
  footer 
    img(src="http://pic.8pig.com/img/h5/foot/bottom-black.png",:alt="data.info_title")
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: 1/2+rem;
  // @include el-size(750,198);
  // img {
  //   // @include el-size(750,198);
  // }
}
</style>
