<template lang="pug">
  header 
    img(:src="data.banner_h5",:alt="data.info_title")
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>


<style lang="scss" scoped>
header {
  // @include el-size(750,564);
  img {
    // @include el-size(750,564);
    width: 100%;
    height: auto
  }
}
</style>
