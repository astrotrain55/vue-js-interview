import Vue from 'vue';
import Vuex from 'vuex';
import filtration from './filtration';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filtration,
  },
});
