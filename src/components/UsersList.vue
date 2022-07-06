<template>
  <v-list three-line>
    <v-subheader
      v-text="header"
    ></v-subheader>

    <template v-for="(user, index) in filteredUsers">
      <v-divider
        :key="index"
        inset
      ></v-divider>

      <v-list-item
        :key="user.title"
      >
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="user.title"></v-list-item-title>
          <v-list-item-subtitle>
            <span class="text--primary">{{ user.to }}</span> &mdash; {{ user.subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/api';

export default {
  methods: {
    ...mapMutations('filtration', ['setFilter']),

    setFilters(users) {
      const filters = {};

      users.forEach((user) => {
        this.filteredFields.forEach((field) => {
          if (user[field]) {
            if (!filters[field]) filters[field] = new Set();
            filters[field].add(user[field]);
          }
        });
      });

      Object.entries(filters).forEach(([filter, values]) => {
        this.setFilter({
          type: filter,
          items: [...values],
        });
      });
    },
  },
  computed: {
    ...mapState('filtration', ['filters']),

    filteredUsers() {
      const filters = {};

      this.filteredFields.forEach((field) => {
        const filter = this.filters[field];
        if (filter.default) filters[field] = filter.default;
      });

      return this.users.filter((user) => {
        let isUser = true;

        Object.keys(filters).forEach((filter) => {
          if (isUser) {
            isUser = user[filter] === filters[filter];
          }
        });

        return isUser;
      });
    },
  },
  created() {
    api.getUsers().then((users) => {
      this.setFilters(users);
      this.users = users;
    });
  },
  data() {
    return {
      header: 'List',
      users: [],
    };
  },
  props: {
    filteredFields: {
      type: Array,
      required: true,
    },
  },
  name: 'UsersList',
};
</script>
