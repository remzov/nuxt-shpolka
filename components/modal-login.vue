<template lang="pug">
  modal(name="loginModal")
    .modal-login
      form.modal-login__form
        h2.modal-login__title Вход

        field(
          v-model="email"
          @valueChanged="setEmail"
          :isInvalid="$v.email.$invalid && $v.email.$dirty"
          :type="'email'"
          :isRequired="true"
          :placeholder="'e-mail'"
        )
          template(v-if="$v.email.$dirty")
            span(v-if="!$v.email.required") Требуется заполнить поле
            span(v-if="!$v.email.email") Требуется ввести email

        field(
          v-model="password"
          @valueChanged="setPassword"
          :isInvalid="$v.password.$invalid && $v.password.$dirty"
          :type="'password'"
          :isRequired="true"
          :placeholder="'пароль'"
        )
          template(v-if="$v.password.$dirty")
            span(v-if="!$v.password.required") Требуется заполнить поле
            span(v-if="!$v.password.minLength") Требуется ввести не менее трёх знаков

        button.modal-login__submit(
          type="submit"
          @click="submit"
        ) Вход

        .modal-login__error(v-if="userFail") Такого пользователя нет
        .modal-login__error(v-if="passwordFail") Пароль неверен
</template>

<script>
import Modal from './modal';
import Field from './field';
import { required, email, minLength }  from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: null,
      password: null,
      userFail: false,
      passwordFail: false
    }
  },

  methods: {
    setEmail(value) {
      this.$v.email.$touch();
    },

    setPassword(value) {
      this.$v.password.$touch();
    },

    submit() {
      event.preventDefault();

      this.$v.$touch();

      if (!this.$v.$invalid) {

        if (this.userFail) {
          this.userFail = false;
        }

        if (this.passwordFail) {
          this.passwordFail = false;
        }

        this.login();
      }
    },

    async login() {
      let users = new Set(
          await fetch(
          `${process.env.baseUrl}/data/users.json`
        )
        .then(resolve => resolve.json())
      );

      let currentUser = [...users].find(element => element.email === this.email);

      if (!currentUser) {
        this.userFail = true;
        return;
      }

      if (currentUser.password !== this.password) {
        this.passwordFail = true;
        return;
      }

      this.$store.commit('login', currentUser);
      this.$store.commit('toggleModal', {
        name: 'loginModal',
        value: false
      });
    }
  },

  components: {
    Modal,
    Field
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(3)
    }
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

  &__submit {
    @include reset-btn;

    padding: 8px;
    background-color: $color-primary;
    color: $color-white;
  }

  &__error {
    margin-top: 16px;
    color: $color-error;
  }
}
</style>


