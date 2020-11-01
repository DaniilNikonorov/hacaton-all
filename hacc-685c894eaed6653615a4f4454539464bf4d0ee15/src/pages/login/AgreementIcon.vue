<template>
  <div
      class="icon-container"
      :class="{ 'active': isActive }"
      @click="handleClick"
  >
    <custom-icon name="done" container-size="extra-small-0"></custom-icon>
  </div>
</template>

<script>
export default {
  name: 'AgreementIcon',
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    handleClick() {
      this.isActive = !this.isActive;
    }
  },
};
</script>

<style lang="sass" scoped>
  .icon-container
    background: #FFFFFF
    border-radius: 3px
    border: 1px solid #000000
    padding: 5px 4px 6px 4px
    cursor: pointer

    &.active
      background: #000000
</style>