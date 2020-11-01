<template>
  <div class="cs-icon" :class="{ [containerSize]: true }" @click="$emit('click')">
    <i :class="{ [name]: true }" :style="{ backgroundImage: svgIcon }" ></i>
  </div>
</template>

<script>
import { getIcon } from './icon';

const DEFAULT_COLOR = '#fff';

 function inArray(validValues) {
  return function(value) {
    return validValues.includes(value);
  };
}


export default {
  name: 'CSIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default() {
        return DEFAULT_COLOR;
      },
    },
    containerSize: {
      type: String,
      validator: inArray(['extra-small-0','extra-small', 'small', 'big-small', 'medium', 'large']),
      default() {
        return 'small';
      },
    },
  },
  computed: {
    svgIcon() {
      return getIcon(this.name, this.color);
    },
  },
};
</script>

<style lang="sass" scoped>
  .cs-icon
    position: relative

    &.extra-small-0
      width: 12px
      height: 8px


    &.extra-small
      width: 16px
      height: 16px

    &.small
      width: 20px
      height: 20px

    &.big-small
      width: 24px
      height: 24px

    &.medium
      width: 30px
      height: 30px

    &.large
      width: 40px
      height: 40px

    i
      width: 100%
      height: 100%
      position: absolute
      background-repeat: no-repeat
      background-position: center
      background-size: contain
</style>
