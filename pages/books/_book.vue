<template lang="pug">
  main
    article.v-book(
      v-if="book"
      v-progress-bar
    )
      .container
        .v-book__wrapper
          .v-book__img-container
            img.c-book-card__img(
              v-if="book.image"
              :src="book.image.url"
              :alt="book.imageAlt || ' '"
            )
          page-header(:title="book.title")
          nuxt-link.v-book__author(
            v-if="book.author"
            :to="{name: 'authors-author', params: {author: book.author.id}}"
          ) {{book.author.name}}
          .v-book__text(
            v-if="book.text"
            v-html="book.text"
          )
        a.v-book__back(href="#" @click.prevent="routeBack")
          svg-icon.v-book__back-icon(name="arrow-left")
          | Назад
      .v-book__progress(data-progress-bar aria-hidden)
</template>

<script>
import pageHeader from '~/components/page-header';

export default {
  async fetch() {
    this.book = await fetch(
      `${process.env.baseUrl}/data/books/${this.$route.params.book}.json`
    )
    .then(res => res.json());
  },

  data() {
    return {
      book: {}
    }
  },

  methods: {
    routeBack() {
      this.$router.back();
    },
  },

  components: {
    pageHeader
  }
};
</script>

<style lang="scss">
.v-book {
  position: relative;
  padding: 120px 0 80px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__author {
    margin-bottom: 16px;
    font-size: 22px;
    color: $color-decor;
  }

  &__text {
    align-self: start;
    font-size: 16px;
    line-height: 1.6;
  }

  &__back {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    font-size: 24px;
    line-height: 36px;
    color: $color-decor;

    &:hover {
      .v-book__back-icon {
        transform: translateX(-8px);
        transition: transform 0.3s ease-out;
      }
    }
  }

  &__back-icon {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    fill: $color-decor;
    transition: transform 0.15s ease-out;
  }

  &__progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: $color-decor;
    transform: scaleX(0);
    transform-origin: 0 50%;
  }
}
</style>
