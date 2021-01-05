<template lang="pug">
  main(v-if="booksPage" class="v-books")
    page-header(
      :title="booksPage.title"
      :desc="booksPage.desc"
    )

    .v-books__sort
      button.v-books__sort-toggler(
        :class="{'v-books__sort-toggler_state_active': isSortActive}"
        type="button"
        @click="toggleSort"
      )
        | Сортировать
        svg-icon(class="v-books__sort-toggler-icon" name="dropdown")

      .v-books__panel(v-show="isSortActive")
        button.v-books__sort-btn(
          :class="sortTitleClasses"
          type="button"
          @click="sortBy('title')"
        )
          | По названию
          svg-icon(class="v-books__sort-btn-icon" name="sort")

        button.v-books__sort-btn(
          :class="sortAuthorClasses"
          type="button"
          @click="sortBy('author.name')"
        )
          | По автору
          svg-icon(class="v-books__sort-btn-icon" name="sort")

        button.v-books__sort-btn(
          :class="sortYearClasses"
          type="button"
          @click="sortBy('year')"
        )
          |По хронологии
          svg-icon(class="v-books__sort-btn-icon" name="sort")

    .v-books__grid
      div(
        v-for="(item, index) in books"
        :key="`books-${item}-${index}`"
      )
        c-book-card(v-bind="item")
</template>

<script>
import getUserData from '~/mixins/getUserData';
import pageHeader from '~/components/page-header';
import CBookCard from '~/components/book-card.vue';

export default {
  async fetch() {
    this.booksPage = await fetch(
      `${process.env.baseUrl}/data/booksPage.json`
    )
    .then(res => res.json());

    this.books= await fetch(
      `${process.env.baseUrl}/data/books.json`
    )
    .then(res => res.json());
  },

  components: {
    CBookCard,
    pageHeader
  },

  data() {
    return {
      booksPage: {},
      books: [],
      isSortActive: false,
      sortType: null,
      sortDirection: null,
    };
  },

  computed: {
    sortTitleClasses() {
      return {
        'v-books__sort-btn_state_asc': (this.sortType === 'title') && (this.sortDirection === 'asc'),
        'v-books__sort-btn_state_desc': (this.sortType === 'title') && (this.sortDirection === 'desc')
      }
    },

    sortAuthorClasses() {
      return  {
        'v-books__sort-btn_state_asc': (this.sortType === 'author.name') && (this.sortDirection === 'asc'),
        'v-books__sort-btn_state_desc': (this.sortType === 'author.name') && (this.sortDirection === 'desc')
      }
    },

    sortYearClasses() {
      return {
        'v-books__sort-btn_state_asc': (this.sortType === 'year') && (this.sortDirection === 'asc'),
        'v-books__sort-btn_state_desc': (this.sortType === 'year') && (this.sortDirection === 'desc')
      }
    }
  },

  methods: {
    toggleSort() {
      this.isSortActive = !this.isSortActive;
    },

    sortBy(type) {
      if (this.sortType === type) {
        switch (this.sortDirection) {
          case null: {
            this.sortDirection = 'asc';
            break;
          }

          case 'asc': {
            this.sortDirection = 'desc';
            break;
          }

          case 'desc': {
            this.sortDirection = 'asc';
            break;
          }

          default: break;
        }
      } else {
        this.sortType = type;
        this.sortDirection = 'asc';
      }

      const getField = (obj, path) => {
      const parts = path.split('.');
        if (parts.length === 1) {
          return obj[parts[0]];
        }
        return getField(obj[parts[0]], parts.slice(1).join('.'));
      };
      const sortAsc = (a, b) => (a > b ? 0 : -1);
      const sortDesc = (a, b) => (a > b ? -1 : 0);

      let sortFunction = this.sortDirection === 'asc' ? sortAsc : sortDesc;
      this.books = this.books.sort((a, b) => sortFunction(getField(a, type), getField(b, type)))
    }
  },

  mixins: [
    getUserData
  ]
};
</script>

<style lang="scss">
.v-books {
  padding: 80px 0;

  &__sort {
    position: relative;
    display: flex;
    justify-content: center;
  }

  &__sort-toggler {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 16px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.2em;
    color: $color-gray;

    &_state {
      &_active {
        color: $color-primary;

        .v-books {
          &__sort-toggler-icon {
            transform: rotate(-180deg);
          }
        }
      }
    }
  }

  &__sort-toggler-icon {
    margin-left: 8px;
    width: 12px;
    height: 12px;
    fill: $color-primary;
    transition: transform 0.2s ease-out;
  }

  &__panel {
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    padding: 64px 24px 16px;
    border: 1px solid $color-gray;
    background-color: $color-white;
  }

  &__sort-btn {
    @include reset-btn;

    display: flex;
    align-items: center;
    padding: 8px;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.2em;

    &_state {
      &_asc {
        .v-books__sort-btn-icon {
          display: block;
          transform: rotate(180deg);
        }
      }

      &_desc {
        .v-books__sort-btn-icon {
          display: block;
        }
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }

  &__sort-btn-icon {
    display: none;
    margin-left: 8px;
    width: 10px;
    height: 10px;
    fill: $color-decor;
  }
}
</style>
