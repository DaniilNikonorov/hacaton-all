<template>
  <div
      v-if="taskTry"
      class="try-info"
      :class="{ 'active': isActive }"
      @click="setActiveTry">
    {{ getLabel }}
    <span class="result">{{ getResult }}</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TryInfo',
  props: {
    taskTry: {
      type: Object,
      default() {
        return null
      },
    },
  },
  computed: {
    getLabel() {
      return `Попытка ${this.taskTry.tryNumber}`;
    },
    getResult() {
      return `${this.taskTry.result}%`;
    },
    isActive() {
      return this.ACTIVE_TRY.id && this.taskTry.id && this.ACTIVE_TRY.id === this.taskTry.id;
    },
    ...mapGetters(['ACTIVE_TRY'])
  },
  methods: {
    setActiveTry() {
      if (!this.isActive) {
        this.SET_ACTIVE_TRY(this.taskTry);
        this.$emit('setActiveTry', this.taskTry);
      }
    },
    ...mapMutations(['SET_ACTIVE_TRY'])
  }
};
</script>

<style lang="sass" scoped>

.try-info
  margin-top: 10px
  padding-bottom: 10px
  font-weight: 600
  font-size: 18px
  line-height: 49px
  display: flex
  justify-content: space-between
  border-bottom: 1px solid #595667
  cursor: pointer
  opacity: .5

  &.active, &:hover
    opacity: 1

.result
  color: #8DCF00

</style>