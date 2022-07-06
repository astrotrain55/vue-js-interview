<template>
  <v-list three-line>
    <v-subheader
      v-text="header"
    ></v-subheader>

    <the-loader v-if="loader"></the-loader>

    <template v-else-if="filteredUsers.length">
      <template v-for="(user, index) in filteredUsers">
        <v-divider
          :key="index"
          inset
        ></v-divider>

        <user-card
          :key="user.title"
          :avatar="user.avatar"
          :title="user.title"
          :to="user.to"
          :subtitle="user.subtitle"
          :address="user.country + ', ' + user.address"
        ></user-card>
      </template>
    </template>

    <template v-else>
      <v-divider inset></v-divider>
      <v-list-item>{{ errorText }}</v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/api';
import TheLoader from './TheLoader';
import UserCard from './UserCard';

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
  watch: {
    filteredUsers(users) {
      if (!users.length) this.errorText = 'Nothing found';
    },
  },
  created() {
    this.loader = true;

    api.getUsers().then((users) => {
      this.setFilters(users);
      this.users = users;
      this.loader = false;
    });
  },
  data() {
    return {
      loader: false,
      header: 'List',
      users: [],
      errorText: 'User list is empty',
    };
  },
  props: {
    filteredFields: {
      type: Array,
      required: true,
    },
  },
  components: {
    TheLoader,
    UserCard,
  },
  name: 'UsersList',
};
</script>
