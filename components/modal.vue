<template lang="pug">
  vue-modal(
    v-model="isShown"
    :wrapperClass="'modal'"
  )
    slot
    button.modal__closer(type="submit" @click="isShown = false")
      svg-icon.modal__closer-icon(name="close")
</template>

<script>
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

export default {
  props: {
    name: {
      type: String
    }
  },

  components: {
    VueModal
  },

  computed: {
    isShown: {
      get () {
        return this.$store.state.main[this.name];
      },
      set (value) {
        this.$store.commit('main/toggleModal', {
          name: this.name,
          value
        })
      }
    }
  },

  methods: {
    closeModal() {
      this.$store.commit('main/closeModal')
    }
  }
}
</script>

<style lang="scss">
  .modal {
    &__closer {
      @include reset-btn;

      position: absolute;
      top: 8px;
      right: 8px;
      width: 30px;
      height: 30px;
    }

    &__closer-icon {
      width: 20px;
      height: 20px;
    }

    .vm-titlebar {
      display: none;
    }

    .vm-content {
      position: relative;
      padding: 16px;
    }
  }
</style>
