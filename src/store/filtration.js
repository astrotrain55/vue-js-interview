export default {
  namespaced: true,
  state() {
    return {
      filters: {
        country: {
          type: 'country',
          default: null,
          items: [],
        },
        score: {
          type: 'score',
          default: null,
          items: [],
        },
        other: {
          type: 'other',
          default: null,
          items: [
            'other0',
            'other1',
          ],
        },
      },
    };
  },
  mutations: {
    setFilter(state, { type, items }) {
      state.filters[type] = {
        type,
        default: null,
        items,
      };
    },
    setValue(state, { type, value }) {
      state.filters[type].default = value;
    },
  },
  getters: {
    filterList: (state) => (fields) => {
      return fields
        .filter((field) => state.filters[field].items.length)
        .map((field) => state.filters[field]);
    },
  },
};
