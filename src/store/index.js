import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import mock from 'mockjs';
import tpl from './dataTpl.json';
import { initData } from './utils';

import fillData from './dataMock.json';

const api = '/api/getJourneyData';

Vue.use(Vuex);

mock.mock(api, ({ body }) => {
  return body.split(',').reduce((acc, cur) => {
    return Object.assign(acc, {
      [cur]: {
        id: cur,
        img: 'http://pic2.8pig.com/road/u_3/20203/f66d3eff97ea1d8e7ddb53ef308a2da6.jpg',
        name: '标题标题标题标题标题',
        price: mock.Random.natural(100, 10000),
        city: '城市',
        country: '国家',
        commentCount: mock.Random.natural(0, 100),
        avatar: 'http://pic.8pig.com/avatar/u_34/6934/0db138e6a72ad9676ceeb74743f7615a2.jpg'
      }
    });
  }, {});
});

const getJourneyIdArr = (section) => section.reduce((acc, cur) => cur.journey.reduce((a, c) => a.concat(c.id), acc), []);

const store = () => new Vuex.Store({
  state: {
    ...tpl,
    data: initData(tpl.tpl, tpl.config),
    fill: fillData,
    res: {},
    cache: {}
  },
  mutations: {
    setValue(state, payload) {
      state[payload.key] = payload.data;
    }
  },
  actions: {
    async setAutoValue({ commit }) {
      await commit('setValue', { key: 'data', data: fillData });
    },
    async setValue({ commit }, payload) {
      await commit('setValue', { key: 'data', data: payload });
    },
    async getResData({ state, commit }) {
      // if (state.data.section[0], name === '') {
      let result;
      await axios.post(api, getJourneyIdArr(state.data.section).join(','))
        .then((res) => {
          commit('setValue', { key: 'res', data: res.data });
          return res;
        })
        .then((res) => {
          axios.post('/app/saveCache', {data: state.data, res: res.data}).catch(function (error) {
            console.log(error);
          });
        })
        .then(() => {
          result = true;
        })
        .catch((err) => {
          result = err;
        });
      return result;
      // } else {
      //   return false
      // }
    },
    async getGenerateData({ commit }) {
      await axios
        .get('/app/getCache')
        .then((res) => {
          commit('setValue', { key: 'cache', data: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

export default store;
