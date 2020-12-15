<template lang="pug">
  main.v-authors(v-if="authorsPage")
    h1.page-title(v-if="authorsPage.title") {{authorsPage.title}}
    .v-authors__desc(v-if="authorsPage.desc") {{authorsPage.desc}}

    ul.v-books__list
      li.v-authors__item(
        v-for="(item, index) in authors"
        :key="`authors-${item}-${index}`"
      )
        nuxt-link.v-authors__link(
          :to="{name: 'author', params: {author: item.id}}"
        ) {{item.name}}
</template>

<script>
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
  }
}
</script>

<style lang="scss">
.v-authors {
  padding: 80px 0;

  &__desc {
    margin-bottom: 24px;
    text-align: center;
    line-height: 1.6;
  }

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
