<template>
  <v-list three-line>
    <v-subheader
      v-text="header"
    ></v-subheader>

    <template v-for="(user, index) in users">
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
import api from '@/api';

export default {
  created() {
    api.getUsers().then((users) => {
      this.users = users;
    });
  },
  data() {
    return {
      header: 'List',
      users: [],
    };
  },
  name: 'UsersList',
};
</script>
