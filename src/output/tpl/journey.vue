<template lang="pug">
  .journey
    .item
      a(class="app-link", :href="'http://h5.8pig.com/journey.html?id='+item.id" ,:data-link="'journey?journey_no='+item.id" )
        .img-box
          img(:src="item.img+'@666w_499h_1e_1c'",:alt="item.name")
          .price ¥ {{item.price}} 起
        .info
          h3 {{item.name}}
          p {{item.city}} {{item.country}}
          p {{item.commentCount}}条评价
          .avatar
            img(:src="item.avatar+'@104w_104h_1e_1c'",:alt="item.name")
        .desc(v-if="desc") 
          span(v-html="desc")        
</template>

<script>
export default {
  props: {
    item: Object,
    title: String,
    desc: String
  }
};
</script>

<style lang="scss" scoped>
// $img-width:666;
// $img-height:499;
$avatar: 104;

.journey {
  margin: $margin*2 $margin;
  .item {
    position: relative;
    margin: $margin auto;
    padding: $margin-s;
    background-color: #fff;
    a {
      &.app-link {
        display: block;
        .img-box {
          position: relative;
          .price {
            position: absolute;
            bottom: calc(20% - 60px);
            left: 0;
            padding: 0 $margin;
            font-size: 36px;
            line-height: 60px;
            color: #fff;
            background-color: rgba(#000, 0.8);
          }
        }
        .info {
          position: relative;
          h3 {
            margin: $margin $avatar+$margin*2 $margin 0;
            color: #333;
            font-size: 32px;
            @include ellipsis-text;
          }
          p {
            font-size: 28px;
            color: #999;
          }
          .avatar {
            position: absolute;
            top: 0;
            right: $margin;
            display: block;
            img {
              @include el-size($avatar);
              border-radius: 50%;
            }
          }
        }
        .desc {
          margin-top: $margin;
          padding: $margin;
          background-color: #eee;
          color: #666;
        }
      }
    }
  }
}
</style>
