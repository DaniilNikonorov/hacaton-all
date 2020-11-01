<template>
  <label class="switch">
    <input ref="switcher" type="checkbox" @click.stop="handleClick">
    <span class="slider round"/>
  </label>
</template>

<script>
export default {
  name: 'Switcher',
  methods: {
    handleClick() {
      this.$emit('click', this.$refs.switcher.checked);
    }
  }
}
</script>

<style lang="sass" scoped>

.switch
  position: relative
  display: inline-block
  width: 36px
  height: 20px

.switch input
  opacity: 0
  width: 0
  height: 0

.slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #ccc
  -webkit-transition: .4s
  transition: .4s


.slider:before
  position: absolute
  content: ""
  height: 16px
  width: 16px
  left: 4px
  bottom: 2px
  background-color: white
  -webkit-transition: .4s
  transition: .4s


input:checked + .slider
  background-color: #8DCF00


input:focus + .slider
  box-shadow: 0 0 1px #8DCF00


input:checked + .slider:before
  -webkit-transform: translateX(12px)
  -ms-transform: translateX(12px)
  transform: translateX(12px)


/* Rounded sliders */
.slider.round
  border-radius: 34px


.slider.round:before
  border-radius: 50%

</style>