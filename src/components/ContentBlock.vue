<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
      class="ma-4"
    >
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <filter-list :filtered-fields="filteredFields"></filter-list>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          max-width="450"
          class="mx-auto"
        >
          <users-list :filtered-fields="filteredFields"></users-list>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FilterList from '@/components/FilterList';
import UsersList from '@/components/UsersList';

export default {
  data() {
    return {
      filteredFields: ['country', 'score'],
    };
  },
  components: {
    FilterList,
    UsersList,
  },
  name: 'ContentBlock',
};
</script>
