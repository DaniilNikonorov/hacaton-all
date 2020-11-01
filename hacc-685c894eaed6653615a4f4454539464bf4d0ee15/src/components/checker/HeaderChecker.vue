<template>
  <div
      class="icon-container"
      @click="handleClick"
  >
    <custom-icon
        v-if="internalValue"
        name="uncheck"
        color="#7F7F7F"
    />
    <custom-icon
        v-if="!internalValue"
        name="check"
        color="#7F7F7F"
    />
  </div>
</template>

<script>
export default {
  name: 'HeaderChecker',
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
  box-sizing: border-box
  border-radius: 5px
  cursor: pointer

</style>