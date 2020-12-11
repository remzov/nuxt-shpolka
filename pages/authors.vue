<template>
  <main v-if="authorsPage" class="v-authors">
    <h1 class="page-title" v-if="authorsPage.title">{{authorsPage.title}}</h1>
    <div class="v-authors__desc" v-if="authorsPage.desc">{{authorsPage.desc}}</div>

    <ul class="v-books__list">
      <li
        v-for="(item, index) in authors"
        :key="`authors-${item}-${index}`"
        class="v-authors__item"
      >
        <nuxt-link
          :to="{name: 'author', params: {author: item.id}}"
          class="v-authors__link">
          {{item.name}}
        </nuxt-link>
      </li>
    </ul>
  </main>
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
