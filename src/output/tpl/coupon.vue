<template lang="pug">
  .coupon(id="coupon")
      .close
        svg(viewBox="0 0 1024 1024")
          path(d="M579.888 512l190.064-190.064C778.624 313.264 784 301.248 784 288c0-26.512-21.488-48-48-48-13.248 0-25.248 5.376-33.936 14.064L512 444.112 321.936 254.064C313.248 245.376 301.248 240 288 240c-26.512 0-48 21.488-48 48 0 13.248 5.376 25.248 14.064 33.936L444.112 512 254.064 702.064C245.376 710.752 240 722.752 240 736c0 26.512 21.488 48 48 48 13.248 0 25.248-5.376 33.936-14.064L512 579.888l190.064 190.064C710.752 778.624 722.752 784 736 784c26.512 0 48-21.488 48-48 0-13.248-5.376-25.248-14.064-33.936L579.888 512z",p-id="1624")
      a(:href="data.coupon_link",target="_blank",:title="data.coupon_title")
        .icon
          svg(viewBox="0 0 1164 1024")
            path(d="M958.115454 400.031882l0-67.834968 0.100284 0L958.215738 211.247238 63.256696 211.247238l0 188.781574c43.35646 25.084305 72.53092 71.960938 72.53092 125.648698 0 53.751205-29.175483 100.648304-72.53092 125.738749l0 164.474982 894.959042 0L958.215738 670.833495l-0.100284 0 0-19.420305c-43.35339-25.091468-72.526827-71.987544-72.526827-125.736703C885.588627 471.991798 914.762063 425.116187 958.115454 400.031882zM667.899676 453.145567l0 24.211425L522.841929 477.356992l0 96.736205 144.56656 0 0 24.209378L522.841929 598.302575l0 96.740298-24.210401 0 0-96.740298L352.489076 598.302575l0-24.209378 146.141428 0 0-96.736205L353.476567 477.356992l0-24.211425 103.035678 0L350.617449 347.154581l17.128099-17.024745 123.009591 123.015731 39.8588 0 123.111922-123.015731 17.122983 17.024745L564.762691 453.145567 667.899676 453.145567z",p-id="2281")
        .text
          p {{data.coupon_title}}
          span {{data.coupon_desc}}
        .btn
          span 领取优惠券
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>


<style lang="scss" scoped>
svg {
  @include el-size(24*2);
  path {
    fill: #fff;
  }
}

.coupon {
  display: flex;
  height: 110px;
  background-color: $black;
  transition: height 0.1s;
  overflow: hidden;
  .close {
    display: flex;
    @include flex-center;
    width: 94px;
    &:active {
      svg {
        path {
          fill: rgba(#fff, 0.7);
        }
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    flex: 1;
    color: #fff;
    .icon {
      position: relative;
      width: 75px;
      svg {
        position: relative;
        z-index: 2;
        display: block;
        margin: auto;
      }
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0px);
        z-index: 1;
        display: block;
        @include el-size(75);
        border-radius: 50%;
        background-color: $primary;
      }
    }
    .text {
      flex: 1;
      padding-left: $margin;
      p {
        font-size: 28px;
      }
    }
    .btn {
      margin: 0 $margin;
      width: 186px;
      span {
        display: block;
        @include el-size(186,60);
        line-height: 60px;
        border-radius: 10px;
        text-align: center;
        color: inherit;
        background-color: $primary;
      }
    }
  }
  &.hide {
    height: 0;
  }
}
</style>
