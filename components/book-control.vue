<template lang="pug">
  .c-book-control(
  )
    button.c-book-control__btn(
      v-if="!isInList"
      type="button"
      aria-label="Add to read-list"
      @click="addBook"
    )
      svg-icon.c-book-control__icon(name="add")

    button.c-book-control__btn.c-book-control__btn_remove(
      v-else
      type="button"
      aria-label="Remove from read-list"
      @click="removeBook"
    )
      svg-icon.c-book-control__icon(name="close")

    .c-book-control__tooltip(
      ref="tooltip"
    )
      template(v-if="!currentUser") Нужно залогиниться, чтобы добавить книгу
      template(v-else-if="isInList && currentUser") Добавлено в список
      template(v-else-if="!isInList && currentUser") Удалено из списка
</template>

<script>
import { mapGetters } from 'vuex';

const tooltipCLassActive = 'c-book-control__tooltip_is-shown';

export default {
  props: {
    bookId: {
      type: Number,
      required: true
    },

    isInCart: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      tooltipTimerId: null
    }
  },

  methods: {
    addBook() {
      if (this.currentUser) {
        this.$store.dispatch('addBook', this.bookId);
      }

      this.handleTooltip();
    },

    removeBook() {
      this.$store.commit('removeBook', this.bookId);
      this.handleTooltip();
    },

    handleTooltip() {
      this.$refs.tooltip.classList.add(tooltipCLassActive);
      window.clearTimeout(this.tooltipTimerId);

      this.tooltipTimerId = setTimeout(() => {
        this.$refs.tooltip.classList.remove(tooltipCLassActive);
      }, 3000);
    }
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'readList'
    ]),

    isInList() {
      return this.readList.find(item => item.id === this.bookId);
    }
  },

  destroyed() {
    if (this.tooltipTimerId) {
      window.clearTimeout(this.tooltipTimerId);
    }
  }
}
</script>

<style lang="scss">
.c-book-control {
  position: relative;

  &__btn {
    @include reset-btn;

    width: 30px;
    height: 30px;
    cursor: pointer;

    &_remove {
      .book-control__icon {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__tooltip {
    opacity: 0;
    position: absolute;
    z-index: 2;
    top: calc(100% + 16px);
    right: 0;
    display: block;
    width: 150px;
    padding: 8px;
    background-color: $color-white;
    font-size: 12px;
    line-height: 1.2;
    pointer-events: none;
    transition: opacity 0.25s ease-out;

    &::before {
      content: '';
      position: absolute;
      top: -8px;
      right: 12px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 16px solid $color-white;
    }

    &_is-shown {
      opacity: 1;
      transition: opacity 0.15s ease-out;
    }
  }

  &__icon {
    width: 30px;
    height: 30px;
    fill: $color-primary;
  }
}
</style>
