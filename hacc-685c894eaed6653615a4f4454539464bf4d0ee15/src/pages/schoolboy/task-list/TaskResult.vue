<template>
  <div
      class="task-result"
      :class="taskState">
    Выполнено {{progressValue}}
    <div class="progress-result" :class="taskState">
      <div :style="{ width: progressValue } "></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskResult',
  props: {
    result: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    // TODO убрать
    taskState() {
      if (this.result === 100) {
        return 'complete';
      } else if (this.result > 0) {
        return 'progress';
      }
      return 'fail';
    },
    progressValue() {
      return `${this.result}%`
    }
  }
}
</script>

<style lang="sass" scoped>
.task-result
  padding: 17px 10px 20px 10px
  margin-bottom: 10px
  border-radius: 5px
  line-height: 10px

  &.fail
    background: #E5FAFF
    color: #00D1FF

  &.progress
    background: #FFF6E5
    color: #FFA800

  &.complete
    background: #F4FAE5
    color: #8DCF00

.progress-result
  margin-top: 10px
  height: 3px
  div
    height: 100%

  &.fail
    background: #CEE1E5

  &.progress
    background: #E5DDCE
    div
      background: #FFA800

  &.complete
    div
      background: #8DCF00


</style>