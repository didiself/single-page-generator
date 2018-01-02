<template lang="pug">
  .container(v-if="storeData")
    coupon(v-if="storeData.coupon_exist",:data="storeData")
    sHeader(:data="storeData")
    sDesc(:data="storeData")
    sNav(v-if="storeData.nav_exist",:data="storeData")
    //- journey
    sSection(v-for="item in storeData.section",:key="item.name",:item="item",:data="storeData",:journeyData="resData")
    sFooter(:data="storeData")
    actionBar
    div(id="storeData",style={display:'none'}) {{getstoreData}}
</template>

<script>
import { mapState } from 'vuex';

import sHeader from './header';
import coupon from './coupon';
import sDesc from './desc';
import sFooter from './footer';
// import journey from './journey'
import sNav from './nav';
import sSection from './section';
import actionBar from './bar';

export default {
  components: {
    sHeader,
    coupon,
    sDesc,
    sFooter,
    // journey,
    sNav,
    sSection,
    actionBar
  },
  data() {
    return {
      data: 1
    };
  },
  beforeCreate() {
    this.$store.dispatch('getGenerateData');
  },
  computed: {
    ...mapState({
      storeData: state => state.cache.data,
      resData: state => state.cache.res
    }),
    getstoreData() {
      return JSON.stringify(this.storeData);
    }
  }
};
</script>
