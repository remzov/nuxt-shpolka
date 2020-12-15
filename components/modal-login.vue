<template>
  <modal name="loginModal">
    <div class="modal-login">
      <h2 class="modal-login__title">Вход</h2>
      <input
        class="modal-login__input"
        type="email"
        required="true"
        placeholder="e-mail"
      />
      <input
        class="modal-login__input"
        type="password"
        required="true"
        placeholder="пароль"
      />
      <button
        class="modal-login__submit"
        type="submit"
      >
        Вход
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from './modal';

export default {
  components: {
    Modal
  }
}
</script>

<style lang="scss">
.modal-login {
  display: flex;
  flex-direction: column;

  &__title {
    margin: 0 0 8px;
  }

  &__input {
    margin-bottom: 8px;
    padding: 8px;
  }

  &__submit {
    @include reset-btn;

    padding: 8px;
    background-color: $color-primary;
    color: $color-white;
  }
}
</style>


