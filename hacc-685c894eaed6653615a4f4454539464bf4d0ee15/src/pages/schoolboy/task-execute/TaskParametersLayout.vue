<template>
  <div class="parameters-layout" v-if="task">
    <div class="param-title">
      Легенда
      <custom-checker v-model="isLegendShow" />
    </div>
    <p class="param-description" v-if="isLegendShow">
      {{ task.legend }}
    </p>
    <div class="param-title">
      Задание
      <custom-checker v-model="isTaskShow" />
    </div>
    <p class="param-description" v-if="isTaskShow">
      {{ task.description }}
    </p>
  </div>

</template>

<script>
export default {
  name: 'TaskParametersLayout',
  props: {
    task: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      isTaskShow: true,
      isLegendShow: true,
      isOutputShow: false,
    }
  }
}
</script>

<style lang="sass" scoped>
.parameters-layout
  width: 25vw
  padding: 30px
  background: #463698
  display: flex
  flex-direction: column
  overflow: auto

.param-title
  padding-left: 10px
  margin-bottom: 15px
  font-weight: 600
  font-size: 18px
  line-height: 22px
  display: flex
  justify-content: space-between
  align-items: center

.param-description
  padding: 20px
  background: #5843BE
  border-radius: 10px
  font-size: 14px
  line-height: 17px
  margin: 0 0 30px
  overflow: auto
</style>