<template lang="pug">
  .p-user
    template(v-if="currentUser")
      h1.p-user__title Личный кабинет

      table.p-user__data
        tr
          th Имя
          th E-mail
          th Город
        tr
          td {{currentUser.name}}
          td {{currentUser.email}}
          td {{currentUser.city}}

      h2.p-user__list-title Список для чтения
      .p-user__list(v-if="readList.length > 0")
        div(
          v-for="(item, index) in readList"
          :key="`books-${item}-${index}`"
        )
          c-book-card(
            v-bind="item"
            :isUserPage="true"
          )
      .p-user__list-empty(v-else)
        | Здесь пока ничего нет... Так добавь же&nbsp;
        nuxt-link(to="/books") тут
        | !

    .p-user__not-login(v-else) Необходимо войти в аккаунт!

</template>

<script>
import getUserData from '~/mixins/getUserData';
import CBookCard from '~/components/book-card.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: null
    }
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'readList'
    ])
  },

  components: {
    CBookCard
  },

  mixins: [
    getUserData
  ]
}
</script>

<style lang="scss">
.p-user {
  padding-top: 100px;

  &__data {
    margin-bottom: 48px;
    width: 100%;
    border-collapse: collapse;

    td,
    th {
      padding: 8px;
      border: 1px solid $color-decor;
      text-align: left;
    }
  }

  &__list-title {
    margin-bottom: 16px;
  }
}
</style>
