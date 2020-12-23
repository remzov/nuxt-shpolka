<template lang="pug">
  header.c-main-header(:class="{'c-main-header_state_active': isMenuActive}")
    .container
      .c-main-header__wrapper
        nuxt-link(to="/" class="c-main-header__title-link") Шполка

        transition(name="showing")
          ul.c-main-header__list(v-show="isMenuActive")
            li(
              v-for="(item, index) in menu"
              :key="`menu-${item}-${index}`"
              class="c-main-header__item"
            )
              nuxt-link(
                :to="item.to"
                class="c-main-header__link"
                @click.native="closeMenu"
              ) {{item.text}}

        .c-main-header__togglers-wrapper
          button(
            class="c-main-header__user-toggler"
            type="button"
            @click="showLoginModal"
            aria-label="User modal"
          )
            svg-icon.c-main-header__menu-icon(name="user")

          button(
            class="c-main-header__menu-toggler"
            type="button"
            @click="toggleMenu"
            aria-label="Toggle menu"
          )
            svg-icon.c-main-header__menu-icon(name="menu")
            svg-icon.c-main-header__close-icon(name="close")
</template>

<script>
export default {
  async fetch() {
    this.menu = await fetch(
      `${process.env.baseUrl}/data/menu.json`
    )
    .then(res => res.json())
  },

  methods: {
    closeMenu() {
      this.isMenuActive = false;
    },

    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },

    showLoginModal() {
      this.$store.commit('toggleModal', {
        name: 'loginModal',
        value: true
      })
    }
  },

  data() {
    return {
      menu: {},
      isMenuActive: false,
    };
  }
};
</script>

<style lang="scss">
.c-main-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 20px 0;
  background-color: transparent;

  &_state {
    &_active {
      .c-main-header {
        &__menu-icon {
          display: none;
        }

        &__close-icon {
          display: block;
        }
      }
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title-link {
    font-family: $font-family-accident;
    font-size: 36px;
    font-weight: 300;
    text-decoration: none;
    color: $color-primary;
  }

  &__list {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    padding: 80px 24px;
    background-color: $color-white;
    list-style: none;
  }

  &__item {
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }

  &__link {
    display: block;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 24px;
    line-height: 1.6;
    color: $color-primary;

    &.router-link-exact-active {
      color: $color-decor;
    }
  }

  &__togglers-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__menu-toggler {
    @include reset-btn;

    position: relative;
    z-index: 2;
    width: 30px;
    height: 30px;

    &_state {
      &_active {
        .c-main-header {
          &__menu-icon {
            display: none;
          }

          &__close-icon {
            display: none;
          }
        }
      }
    }
  }

  &__user-toggler {
    @include reset-btn;

    position: relative;
    z-index: 2;
    width: 30px;
    height: 30px;
  }

  &__menu-icon {
    display: block;
    width: 30px;
    height: 30px;
    fill: $color-primary;
  }

  &__close-icon {
    display: none;
    width: 30px;
    height: 30px;
    fill: $color-primary;
  }
}

.showing-enter-active {
  transition: transform ease-out 0.3s;
}

.showing-leave-active {
  transition: transform ease-in 0.2s;
}

.showing-enter {
  transform: translateY(-100%);
}

.showing-enter-to {
  transform: translateY(0);
}

.showing-leave-to {
  transform: translateY(-100%);
}
</style>
