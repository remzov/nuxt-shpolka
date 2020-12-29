<template lang="pug">
  .field
    input.field__input(
      :class="{'field__input_error': isInvalid}"
      :type="type"
      :required="isRequired"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('valueChanged')"
    )
    .field__errors
      slot
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        required: false,
        default: null
      },

      type: {
        type: String,
        required: false,
        default: 'text'
      },

      isRequired: {
        type: Boolean,
        required: false,
        default: false
      },

      placeholder: {
        type: String,
        required: false,
        default: null,
      },

      isInvalid: {
        type: Boolean,
        required: false
      }
    }
  }
</script>

<style lang="scss">
  .field {
    position: relative;
    margin-bottom: 16px;

    &__input {
      width: 100%;
      padding: 8px;
      border: 1px solid $color-decor;

      &_error {
        border-color: $color-error;
      }
    }

    &__errors {
      position: absolute;
      left: 0;
      bottom: -14px;
      font-size: 12px;
      line-height: 1;
    }
  }
</style>
