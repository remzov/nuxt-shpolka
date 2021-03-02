<template lang="pug">
  transition(name="preloader")
    .preloader(v-show="loading")
      .preloader__text Идёт загрузка...
      svg-icon.preloader__icon(name="loading")
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      loading: 'loading/loading',
    })
  },
}
</script>

<style lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $color-white;

  &__text {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 700;
  }

  &__icon {
    animation: circling 2s linear infinite;
  }
}

.preloader-leave-active {
  transition: transform ease-in 1s;
}

.preloader-enter {
  transform: translateY(-100%);
}

.preloader-enter-to {
  transform: translateY(0);
}

.preloader-leave-to {
  transform: translateY(-100%);
}

@keyframes circling {
  100% {
    transform: rotate(360deg);
  }
}
</style>
