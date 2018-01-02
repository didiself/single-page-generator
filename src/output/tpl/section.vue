<template lang="pug">
  section(:id="item.name")
      .title
        h2
          span(:style="titleStyle") {{item.title}}
        h3 {{item.desc}}
      blockquote(:style="descStyle")
        span(v-html="item.desc")

      journey(v-for="j in item.journey",:key="j.id",:title="data.info_title",:item="journeyData[j.id]",:desc="j.desc")
</template>

<script>
import journey from './journey';

export default {
  components: {
    journey
  },
  props: {
    item: Object,
    data: Object,
    journeyData: Object
  },
  data() {
    return {
      titleStyle: this.data.color_important ? { color: '#' + this.data.color_important } : {},
      descStyle: this.data.color_important ? { color: '#' + this.data.color_desc } : {}
    };
  }
};
</script>


<style lang="scss" scoped>
$nav-height: 114px;

section {
  margin: 1rem 0;
  padding-top: $nav-height;
}

.title {
  text-align: center;
  h2 {
    margin-top: $margin;
    display: flex;
    @include flex-center;
    font-size: 26*2px;
    span {
      padding: 0 $margin;
    }
    color: $important;
    &:after,
    &:before {
      content: "";
      display: inline-block;
      width: 1rem;
      height: 1px;
      vertical-align: middle;
      background-color: #000;
    }
  }
  h3 {
    color: #666;
  }
}

blockquote {
  position: relative;
  margin: $margin;
  padding: $margin;
  color: #333;
  font-size: 28px;
  &:before,
  &:after {
    content: '"';
    position: absolute;
  }
  &:before {
    top: 0;
    left: 0;
  }
  &:after {
    right: 0;
    bottom: 0;
  }
}
</style>
