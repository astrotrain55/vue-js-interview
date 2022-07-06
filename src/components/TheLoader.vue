<template>
  <div class="the-loader">
    <v-progress-circular
      indeterminate
      color="purple"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'the-loader',
};
</script>

<style lang="scss">
.the-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}
</style>
