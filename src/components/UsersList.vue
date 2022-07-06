<template>
  <v-list three-line>
    <v-subheader
      v-text="header"
    ></v-subheader>

    <the-loader v-if="loader"></the-loader>

    <transition-group
      v-else-if="filteredUsers.length"
      name="users-list"
      tag="div"
    >
      <div v-for="user in filteredUsers" :key="user.title">
        <v-divider inset></v-divider>

        <user-card
          :avatar="user.avatar"
          :title="user.title"
          :to="user.to"
          :subtitle="user.subtitle"
          :address="user.country + ', ' + user.address"
        ></user-card>
      </div>
    </transition-group>

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

<style lang="scss">
.users-list-enter-active,
.users-list-leave-active {
  max-height: 500px;
  overflow: hidden;
  transition: all 1s ease-in;
}
.users-list-enter,
.users-list-leave-to {
  opacity: 0;
  max-height: 0;
  transition: all 1s ease-out;
  transform: translateY(30px);
}
</style>
