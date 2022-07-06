<template>
  <v-list-item>
    <v-list-item-avatar
      class="user-card-avatar"
      @click="visibleAddress = !visibleAddress"
    >
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>

    <v-list-item-content v-if="visibleAddress">
      <small>Address:</small> {{ address }}
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-list-item-title v-html="title"></v-list-item-title>
      <v-list-item-subtitle>
        <span class="text--primary">{{ to }}</span> &mdash; {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  data() {
    return {
      visibleAddress: false,
    };
  },
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
    address: {
      type: String,
      default: '',
    },
  },
  name: 'UserCard',
};
</script>

<style lang="scss">
.user-card-avatar {
  cursor: pointer;
  transition: opacity .5s;

  &:hover {
    opacity: .5;
  }
}
</style>
