<template>
 <div v-if="task && isRouteAvailable('SCHOOLBOY')" class="task-container">
   <div class="main-info">
      <task-parameters-layout :task="task"/>
       <textarea
           v-if="trySchoolboy"
           class="code-space"
           v-model="trySchoolboy.code"
           @keydown="handleTab($event)"
           :disabled="isTextAreaDisabled"  />
       <tries-layout
           :tries-list="triesList"
           @setActiveTry="putCodeInArea($event)" />
   </div>
   <div class="task-action">
       <tree-select
           style="width: 200px; height: 4vh"
           v-model="lang"
           placeholder=""
           :options="langOptions"/>
       <div
           v-if="isShowReviewButton"
           class="button-review"
           @click="executeCode()"
       >
         <custom-icon
             name="eye"
             color="#00D1FF"
         />
         Проверить код
       </div>
       <modal-result
           v-model="isModalShow"
           :try-schoolboy="trySchoolboy"
           :test-cases="testCasesResult"
           @save="saveTry"
           @close="isExecuteCode = false"
       />
       <div
           v-if="isShowClearButton"
           class="button-clear"
           @click="clearCode"
       >
         Сбросить
       </div>
   </div>
 </div>
</template>

<script>
import http from '@/http/http';

import { mapGetters, mapMutations } from 'vuex';
import TrySchoolboy from '@/domain/TrySchoolboy';

import route from '@/mixins/route';

import TaskParametersLayout from '@/pages/schoolboy/task-execute/TaskParametersLayout';
import TriesLayout from '@/pages/schoolboy/task-execute/TriesLayout';
import ModalResult from '@/pages/schoolboy/task-execute/ModalResult';

export default {
  name: 'TaskLayout',
  components: {
    ModalResult,
    TriesLayout,
    TaskParametersLayout
  },
  mixins: [ route ],
  data() {
    return {
      task: null,
      trySchoolboy: null,
      isTextAreaDisabled: false,
      triesList: [],
      isModalShow: false,
      isExecuteCode: false,
      testCases: [],
      testCasesResult: [],
      langOptions: [
        { id: 'java', label: 'java' },
        { id: 'cpp', label: 'c++'},
        { id: 'c', label: 'c'},
      ],
      lang: null,
    }
  },
  async created() {
    setTimeout(async () => {
      this.task = this.SCHOOLBOY_TASK_LIST.find(task => task.id === this.$route.params.id);
      this.initializeTry();

      await this.setTriesList();
    }, 120);
  },
  computed: {
    isShowReviewButton() {
      return !this.isExecuteCode && this.trySchoolboy.code && !this.isTextAreaDisabled;
    },
    isShowClearButton() {
      return !this.isExecuteCode && this.trySchoolboy.code;
    },
    ...mapGetters(['SCHOOLBOY_TASK_LIST', 'SCHOOLBOY']),
  },
  methods: {
    handleTab(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.trySchoolboy.code = this.trySchoolboy.code.concat('  ');
      }
    },
    clearCode() {
      this.trySchoolboy.code = '';
      this.isTextAreaDisabled = false;
      this.CLEAR_ACTIVE_TRY();
    },
    putCodeInArea(taskTry) {
      this.trySchoolboy.code = taskTry.code;
      this.isTextAreaDisabled = true;
    },
    async setTriesList() {
      this.triesList = await http.getAllTries(this.SCHOOLBOY.id, this.task.id)
          .catch(() => console.log('Хьюстон у нас проблемы'));
    },
    async saveTry() {
      this.isExecuteCode = false;
      const arrLength = this.triesList.length;
      this.trySchoolboy.tryNumber = arrLength + 1;


      const newTry = await http.saveTry(this.trySchoolboy);
      if (newTry) {
        this.triesList.push(newTry);
        this.initializeTry();
      }
    },
    getResult() {
      let result = 100;

      const initLength = this.testCasesResult.length;
      const executionCase = this.testCasesResult
          .filter(tc => tc.type === 'SUCCESS');
      const executionCaseLength = executionCase.length;

      if (executionCaseLength !== initLength) {
        result = executionCaseLength / initLength;

        if (result !== 0) {
          const equalInputLength = executionCase.filter(ec => {
            const testCase = this.testCases.find(tc => ec.id === tc.id)
            return testCase.output === ec.output;
          });
          if (equalInputLength.length !== 0) {
            result = equalInputLength / executionCaseLength;
          }
        }
      }
      return result;
    },
    initializeTry() {
      this.trySchoolboy = new TrySchoolboy({ schoolboyId: this.SCHOOLBOY.id, taskId: this.task.id });
    },
    async executeCode() {
      this.isExecuteCode = true;
      await http.getAllTestCases(this.trySchoolboy.taskId).then(
          async (data) => {
            this.testCases = data;
            await this.executeAllTestCases().then(() => {
              this.trySchoolboy.result = this.getResult();
              this.isModalShow = true
            });
          }
      );
    },
    async executeAllTestCases() {
      const lang = this.lang ? this.lang.id : 'java';
      for (let i = 0; i < this.testCases.length; i++) {
        await http.executeTestCase(this.trySchoolboy.code, this.testCases[i], lang).then((data) => {
          this.testCasesResult[i] = { ...data, id: this.testCases[i].id };
        });
      }
    },
    ...mapMutations(['CLEAR_ACTIVE_TRY']),
  },
}
</script>

<style lang="sass" scoped>
 .task-container
   width: 100vw
   background: #000000

 .main-info
   display: flex
   flex-wrap: nowrap
   height: 80.6vh
   font-size: 14px
   line-height: 17px

 .code-space
   width: 55vw
   padding: 30px 20px
   background: #352872
   color: #FFFFFF
   outline: none
   border: none
   resize: none

 .task-action
   height: 9.7vh
   margin-left: 25vw
   display: flex
   align-items: center
   column-gap: 20px
</style>