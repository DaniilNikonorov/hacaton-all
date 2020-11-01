<template>
  <div
      class="icon-container"
      @click="handleClick"
  >
    <custom-icon
        v-if="internalValue"
        name="uncheck"
        container-size="extra-small-0"
    />
    <custom-icon
        v-if="!internalValue"
        name="check"
        container-size="extra-small-0"
    />
  </div>
</template>

<script>
export default {
  name: 'Checker',
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      internalValue: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('input', !this.internalValue);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.internalValue = val;
      }
    }
  }
  
}
</script>

<style lang="sass" scoped>

.icon-container
  width: 30px
  height: 30px
  display: flex
  justify-content: center
  align-items: center
  border: 1px solid #FFFFFF
  box-sizing: border-box
  border-radius: 5px
  cursor: pointer

</style>