<template lang="pug">
  modal(name="loginModal")
    .modal-login
      h2.modal-login__title Вход
      input.modal-login__input(
        type="email"
        required="true"
        placeholder="e-mail"
      )
      input.modal-login__input(
        type="password"
        required="true"
        placeholder="пароль"
      )
      button.modal-login__submit(
        type="submit"
      ) Вход
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


