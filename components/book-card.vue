<template lang="pug">
  article.c-book-card
    .c-book-card__img-container
      img(
        class="c-book-card__img"
        :src="image.url"
        :alt="imageAlt || ' '"
      )
    .c-book-card__desc
      nuxt-link.c-book-card__link(
        :to="{name: 'books-book', params: {book: id}}"
      )
        h2.c-book-card__title(v-if="title") {{title}}
      .c-book-card__info
        nuxt-link(
          v-if="author.id && author.name"
          class="c-book-card__link"
          :to="{name: 'authors-author', params: {author: author.id}}"
        ) {{author.name}},&nbsp;
        | {{year}}

    bookControl(
      :bookId="id"
      :isUserPage="isUserPage"
    )
</template>

<script>
import bookControl from './book-control';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      default: '',
    },

    author: {
      type: [Object, Number],
      required: false,
    },

    year: {
      type: Number,
      required: true,
    },

    image: {
      type: Object,
      required: true,
    },

    imageAlt: {
      type: String,
      required: true,
      default: ' ',
    },

    isUserPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    bookControl
  },

  inheritAttrs: false,
};
</script>

<style lang="scss">
.c-book-card {
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid $color-primary;

  &__img-container {
    margin-right: 16px;
    flex: 0 0 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__link {
    text-decoration: none;
  }

  &__title {
    margin-bottom: 8px;
    font-family: $font-family-accident;
    font-size: 22px;
    line-height: 1.4;
    color: $color-primary;
  }

  &__info {
    font-size: 14px;
    line-height: 20px;
    color: $color-gray;
  }

  .c-book-control {
    margin-left: auto;
  }
}
</style>
