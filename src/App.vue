<template>
  <v-app>
    <v-main>
      <content-block></content-block>
    </v-main>

    <v-footer app v-bind="localAttrs">
      <the-footer></the-footer>
    </v-footer>
  </v-app>
</template>

<script>
import ContentBlock from './components/ContentBlock';
import TheFooter from './components/TheFooter';

export default {
  computed: {
    localAttrs() {
      const attrs = {};

      attrs.absolute = true;
      attrs.fixed = false;

      return attrs;
    },
  },
  components: {
    ContentBlock,
    TheFooter,
  },
  name: 'App',
};
</script>
