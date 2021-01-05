<template lang="pug">
  header.c-main-header(:class="{'c-main-header_state_active': isMenuActive}")
    .container
      .c-main-header__wrapper
        nuxt-link.c-main-header__title-link(to="/") Шполка

        transition(name="showing")
          .c-main-header__list-wrapper(v-show="isMenuActive")
            ul.c-main-header__list
              li.c-main-header__item(
                v-for="(item, index) in menu"
                :key="`menu-${item}-${index}`"
              )
                nuxt-link.c-main-header__link(
                  :to="item.to"
                  @click.native="closeMenu"
                ) {{item.text}}

        .c-main-header__togglers-wrapper
          template(v-if="!currentUser")
            button.c-main-header__user-login(
              type="button"
              @click="showLoginModal"
              aria-label="User modal"
            )
              svg-icon.c-main-header__user-icon(name="user")
          template(v-else-if="currentUser")
            nuxt-link.c-main-header__user-account(
              to="/user"
            ) {{currentUser.name}}
            button.c-main-header__user-logout(
              type="button"
              @click="logout"
              aria-label="Logout"
            )
              svg-icon.c-main-header__user-logout(name="logout")

          button.c-main-header__menu-toggler(
            type="button"
            @click="toggleMenu"
            aria-label="Toggle menu"
          )
            svg-icon.c-main-header__menu-icon(name="menu")
            svg-icon.c-main-header__close-icon(name="close")
</template>

<script>
import { mapGetters } from 'vuex';

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
    },

    logout() {
      this.$store.commit('logout')
    }
  },

  data() {
    return {
      menu: {},
      isMenuActive: false,
    };
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ])
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

  &__list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    background-color: $color-white;
  }

  &__list {
    margin: 0 auto;
    max-width: 570px;
    padding: 80px 24px;
    list-style: none;
  }

  &__item {
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }

  &__link {
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 24px;
    line-height: 1.6;
    color: $color-primary;

    &.nuxt-link-exact-active {
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
    cursor: pointer;

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

  &__user-login {
    @include reset-btn;

    position: relative;
    z-index: 2;
    width: 30px;
    height: 30px;
  }

  &__user-account {
    font-weight: 700;
    color: $color-black;
  }

  &__user-logout {
    @include reset-btn;

    width: 30px;
    height: 30px;
  }

  &__user-logout-icon {
    width: 16px;
    height: 16px;
  }

  &__user-icon {
    display: block;
    width: 30px;
    height: 30px;
    fill: $color-primary;
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
