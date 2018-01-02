<template lang="pug">
  .nav-holder(id="nav")
      nav
        //- (:class="{fixed:isFixed}")
        .container
          a(v-for="(item,index) in data.section",:key="index",:class="{selected:index === selectedIdx}") {{item.title}}
          //- ,@click="scrollToSection(index)"
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      // navTop: undefined,
      // isFixed: false,
      // sectionTopArray: [],
      selectedIdx: 0
    };
  // },
  // mounted() {
  //   window.addEventListener("scroll", this.handleScroll);
  // },
  // methods: {
  //   handleScroll() {
  //     this.navTop || (this.navTop = document.querySelector(".nav-holder").offsetTop);
  //     this.initArray()

  //     if (window.scrollY >= this.navTop) {
  //       this.isFixed = true;
  //       for (let i = 0; i < this.sectionTopArray.length; i++) {
  //         if(window.scrollY >= this.sectionTopArray[this.sectionTopArray.length-1] && this.selectedIdx !== i){
  //           this.selectedIdx = i
  //         }else if (window.scrollY >= this.sectionTopArray[i] && window.scrollY < this.sectionTopArray[i+1] && this.selectedIdx !== i) {
  //           this.selectedIdx = i
  //         }
  //       }
  //     } else {
  //       this.isFixed = false;
  //     }
  //   },
  //   scrollToSection(index){
  //     this.initArray()
  //     window.scroll(0, this.sectionTopArray[index])
  //   },
  //   initArray(){
  //     this.sectionTopArray.length < 1 && (this.sectionTopArray = Array.from(document.querySelectorAll("section")).map(s => s.offsetTop));
  //   }
  }
};
</script>

<style lang="scss" scoped>
$nav-height: 114px;

.nav-holder {
  height: $nav-height;
}

nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  text-align: center;
  &.fixed {
    position: fixed;
  }
  .container {
    display: flex;
    height: $nav-height;
    background-color: #fff;
    a {
      display: flex;
      @include flex-center;
      flex: 1;
      box-sizing: border-box;
      border-bottom: 4px solid transparent;
      font-size: 28px;
      white-space: nowrap;
      overflow: hidden;
      &.selected {
        color: $primary;
        border-color: $primary;
      }
    }
  }
}
</style>
