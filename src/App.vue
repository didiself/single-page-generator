<template lang='pug'>
  div(id="app")
    router-view
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
img{
  vertical-align: top;
}
p,h1,h2,h3,h4{
  margin: 0;
}
a{
  text-decoration: none;
}

// body{
//   font-size: 24px;
//   background-color: $bodyBg;
// }
</style>
