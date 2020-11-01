<template>
  <div
    ref="modal"
    class="cs-modal-overlay"
    :class="{
    'cs-modal-overlay-showed': visible
  }">
    <span class="modal-title">Результат</span>
    <div class="result">
      <div class="value-result" :style="{ width: `${result}%` }">
        <span class="label">{{ `${result}%` }} </span>
      </div>
    </div>
    <div>
      <v-data-table
          disable-sort
          class="modal-table"
          v-if="testCasesResult.length > 0"
          :headers="resultTableHeader"
          :items="testCasesResult"
          hide-default-footer
      >
        <template #item.output="{ value}">
          {{ getCorrectOutput(value) }}
        </template>
        <template #item.type="{ value }">
          {{ statuses[value] }}
        </template>
      </v-data-table>
    </div>
    <div class="button-container">
        <div class="button-review" @click="save">
          Сохранить результат
        </div>
        <div class="button-review" @click="close">
          Закрыть
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalResult',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    trySchoolboy: {
      type: Object,
      default() {
        return null;
      }
    },
    testCases: {
      type: Array,
      default() {
        return [];
      }
    },
    result: {
      type: [Number, String],
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      visible: false,
      isLoadingResult: true,
      resultTableHeader: [
        { text: 'Время выполнения', value: 'time' },
        { text: 'Статус', value: 'type' },
        { text: 'Полученный результат', value: 'output' },
      ],
      statuses: {
        RUNTIME_ERROR: 'Ошибка в исполнении',
        COMPILATION_ERROR: 'Ошибка компиляции',
        SUCCESS: 'Программа исполняется',
        TIMEOUT: 'Превышено временное ограничение',
      }
    };
  },
  computed: {
    testCasesResult() {
      return this.testCases;
    }
  },
  methods: {
    save(){
      this.$emit('save');
      this.visible = false;
    },
    getCorrectOutput(val) {
      if (val && val.length > 150) {
        return val.substring(0, 149);
      }
      return val;
    },
    close() {
      this.$emit('close');
      this.visible = false;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val;
      },
    },
    visible: {
      handler(val) {
        const modal = this.$refs.modal;
        this.$emit('input', val);

        if (val) {
          document.body.appendChild(modal);
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'unset';
          modal.remove();
        }
      },
    },
  },
}
</script>

<style lang="sass" scoped>

  .cs-modal
    position: relative

    &-overlay
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 2000
      display: none
      align-items: center
      justify-content: center
      overflow: hidden

      &-showed
        display: flex
        flex-direction: column
        background: #5843BE
        border-radius: 10px
        width: 800px
        height: fit-content
        max-height: 600px
        overflow: auto
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        padding: 20px 30px


  .result
    position: relative
    height: 4.5vh
    width: 100%
    border: 1px solid #8DCF00
    box-sizing: border-box
    border-radius: 10px
    margin-bottom: 20px

  .value-result
    background: #8DCF00
    border-radius: 10px 0px 0px 10px
    width: 22vw
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    font-weight: bold
    font-size: 18px
    line-height: 22px

  .label
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)


  .button-container
    display: flex
    width: 100%
    column-gap: 20px
    justify-content: center

  .modal-title
    font-weight: 600
    font-size: 28px
    line-height: 30px
    margin-bottom: 30px

  .task-cases-grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr

  .modal-table
    margin-bottom: 20px
    overflow: auto

</style>