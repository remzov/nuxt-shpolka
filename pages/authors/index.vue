<template lang="pug">
  main.v-authors(v-if="authorsPage")
    page-header(
      :title="authorsPage.title"
      :desc="authorsPage.desc"
    )

    ul.v-books__list
      li.v-authors__item(
        v-for="(item, index) in authors"
        :key="`authors-${item}-${index}`"
      )
        nuxt-link.v-authors__link(
          :to="{name: 'authors-author', params: {author: item.id}}"
        ) {{item.name}}
</template>

<script>
import pageHeader from '~/components/page-header';

export default {
  async fetch() {
    this.authorsPage = await fetch(
      `${process.env.baseUrl}/data/authorsPage.json`
    )
    .then(res => res.json());


    this.authors = await fetch(
      `${process.env.baseUrl}/data/authors.json`
    )
    .then(res => res.json());
  },

  data() {
    return {
      authorsPage: {},
      authors: {}
    }
  },

  components: {
    pageHeader
  }
}
</script>

<style lang="scss">
.v-authors {
  padding: 80px 0;

  &__item {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__link {
    font-size: 20px;
  }
}
</style>
