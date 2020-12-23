<template lang="pug">
  .page-header
    h1.page-header__title {{title}}
    .page-header__desc(v-html="desc")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },

    desc: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.page-header {
  margin-bottom: 24px;

  &__title {
    margin-bottom: 16px;
    text-align: center;
    font-size: 32px;
    line-height: 1.6;
    color: $color-primary;
  }

  &__desc {
    font-size: 18px;
    line-height: 1.6;
  }
}
</style>
