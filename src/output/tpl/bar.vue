<template lang="pug">
.action-bar-holder
  .action-bar
    .container
      a(v-for="(btn,idx) in btns",:key="idx",@click="haddleClick(btn.link)",target="_blank") {{btn.text}}
</template>

<script>
export default {
  data() {
    return {
      btns: [
        {
          text: '左按钮',
          link: 'http://h5.8pig.com/'
        },
        {
          text: '右按钮',
          link: 'http://h5.8pig.com/'
        }
      ]
    };
  },
  methods: {
    haddleClick(text) {
      alert(text);
    }
  }
};
</script>

<style lang="scss" scoped>
$height:100px;
.action-bar-holder{
  height: $height;
}
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  .container {
    display: flex;
    background-color: rgba($primary, 0.75);
    a {
      flex: 1;
      font-size: 32px;
      line-height: $height;
      color: #fff;
      box-sizing: border-box;
      border-right: 1px solid #fff;
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
