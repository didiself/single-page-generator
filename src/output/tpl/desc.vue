<template lang="pug">
  p.desc 
    span(v-html="data.info_desc")
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>


<style lang="scss" scoped>
.desc{
  margin: 1rem $margin*2;
  text-indent: 26*2px;
  font-size: 26px;
  color: #333;
}
</style>
