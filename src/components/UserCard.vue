<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-html="title"></v-list-item-title>
      <v-list-item-subtitle>
        <span class="text--primary">{{ to }}</span> &mdash; {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  name: 'UserCard',
};
</script>
