<template lang="pug">
  main(v-if="author" class="v-author")
    h1.page-title(v-if="author.name") {{ author.name }}
    .v-author__text(
      v-if="author.desc"
      v-html="author.desc"
    )
    ul.v-author__list
      li(
        v-for="(item, index) in author.books"
        :key="`books-${item}-${index}`"
      )
        c-book-card(v-bind="item")
</template>

<script>
import CBookCard from "~/components/book-card.vue";

export default {
  async fetch() {
    this.author = await fetch(
      `${process.env.baseUrl}/data/authors/${this.$route.params.author}.json`
    ).then(res => res.json())
  },

  components: {
    CBookCard
  },

  data() {
    return {
      author: {}
    };
  }
};
</script>

<style lang="scss">
.v-author {
  padding: 80px 0;

  &__text {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.6;
  }

  &__list {
    padding: 0;
    list-style: none;
  }
}
</style>
