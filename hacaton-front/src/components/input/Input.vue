<template>
  <input
      class="input"
      :class="{ 'error': error }"
      :type="type"
      :placeholder="placeholder"
      :value="internalValue"
      @focus="$v.$reset()"
      @blur="$v.$touch()"
      @input="handleInput"
  >
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default() {
        return null;
      },
    },
    placeholder: {
      type: String,
      default() {
        return ''
      },
    },
    type: {
      type: String,
      default() {
        return 'text'
      },
    },
  },
  data() {
    return {
      internalValue: null,
      internalError: false,
    }
  },
  computed: {
    error() {
      return this.$v.$error;
    }
  },
  methods: {
    handleInput(e) {
      this.$v.$touch();
      this.$emit('input', e.target.value);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.internalValue = val;
      },
    },
  },
  validations: {
    internalValue: {
      required,
    },
  },
};
</script>

<style lang="sass" scoped>
  .input
    padding-left: 30px
    background: rgba(0, 0, 0, 0.1)
    border: 2px solid rgba(0, 0, 0, 0.3)
    border-radius: 10px
    outline: none
    font-weight: bold
    font-size: 14px
    line-height: 17px

    &:hover
      background: rgba(88, 67, 190, 0.1)
      border: 2px solid rgba(88, 67, 190, 0.3)
      color: #B2A8E1

    &:focus
      background: #FFFFFF
      border: 2px solid rgba(0, 0, 0, 0.4)
      border-radius: 10px
      color: #999999

    &.error
      border-color: #D96980
      background: #fff


</style>