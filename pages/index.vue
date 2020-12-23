<template lang="pug">
  .v-home(v-if="homePage")
    page-header(
      :title="homePage.title"
      :desc="homePage.desc"
    )
    blockquote.v-home__blockquote(
      :style="`background-image: url('${homePage.quoteBackgroundImage}')`"
    )
      span.v-home__blockquote-text
        | {{homePage.quote}}
        cite.v-home__blockquote-author {{homePage.quoteAuthor}}
</template>

<script>
import pageHeader from '~/components/page-header';

export default {
  async fetch() {
    this.homePage = await fetch(
      `${process.env.baseUrl}/data/homePage.json`
    )
    .then(res => res.json());
  },

  data() {
    return {
      homePage: {}
    }
  },

  components: {
    pageHeader
  }
};
</script>

<style lang="scss">
.v-home {
  padding-top: 100px;

  &__blockquote {
    margin-left: -$container-padding-mobile;
    margin-right: -$container-padding-mobile;
    padding: 36px $container-padding-mobile;
    position: relative;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    font-family: $font-family-accident;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.6;
    color: $color-white;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-black, 0.8);
    }
  }

  &__blockquote-text {
    position: relative;
    z-index: 1;
  }

  &__blockquote-author {
    margin-top: 16px;
    display: block;
    text-align: right;
    font-size: 26px;
  }
}
</style>
