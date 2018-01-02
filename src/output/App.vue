<template lang='pug'>
  div(id="app")
    tpl
</template>

<script>
import tpl from './tpl/h5';

export default {
  name: 'app',
  components: {
    tpl
  }
};
</script>

<style lang="scss">
img {
  vertical-align: top;
}
p,
h1,
h2,
h3,
h4 {
  margin: 0;
}
a {
  text-decoration: none;
}

img {
  width: 100%;
  height: auto;
}

body {
  font-size: 24px;
  background-color: $bodyBg;
}

.container {
  margin: auto;
  width: 100%;
  max-width: 750px;
}
</style>
