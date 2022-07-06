<template>
  <v-col
    cols="12"
    md="4"
  >
    <v-select
      v-for="filter in filters"
      :key="filter.type"
      :value="filter.default"
      :items="filter.items"
      clearable
      :label="'Filter by ' + filter.type"
      @input="onChange(filter.type, $event)"
    ></v-select>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations('filtration', ['setValue']),

    onChange(type, value) {
      this.setValue({ type, value });
    },
  },
  computed: {
    ...mapGetters('filtration', ['filterList']),

    filters() {
      return this.filterList(this.filteredFields);
    },
  },
  props: {
    filteredFields: {
      type: Array,
      required: true,
    },
  },
  name: 'FilterList',
};
</script>
