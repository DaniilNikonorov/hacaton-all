<template>
  <div v-if="task && isRouteAvailable('TEACHER')" class="task-container">

    <div class="main-info">
      <div class="task-info">
        Задание
        <input class="input input-name" v-model="task.name">
        Легенда
        <textarea
            class="description input"
            v-model="task.legend"
            placeholder="Легенда (необязательное поле)"
            @keydown="handleTab($event, 'legend')"/>
        Условие задания
        <textarea
            class="description input"
            v-model="task.description"
            placeholder="Опишите задачу"
            @keydown="handleTab($event, 'description')"/>
      </div>
      <div class="test-data-space">
        <div
            v-for="(data, key) in task.testTaskList"
            class="test-data"
            :key="`input_${data.input}_${key}_output_${data.output}_${key}`"
        >
          <span class="test-data-title"> {{ `Чекер ${key + 1}` }} </span>
          Входные данные
          <input
              id="input"
              class="input input-task"
              :value="data.input"
              @change="data.input = $event.target.value"
              :key="`input_${data.input}_${key}`"
          >
          Выходные данные
          <input
              class="input input-task"
              :value="data.output"
              @change="data.output = $event.target.value"
              :key="`output_${data.output}_${key}`"
          >
        </div>
        <div class="icon-add-overlay add-first" @click.stop="addNewTestData()">
          <custom-icon name="plus" color="#00D1FF" />
        </div>
      </div>
      <div class="class-select">
        Выберите класс
        <tree-select
            style="margin-top: 10px"
            valueFormat="Object"
            v-model="task.classSchoolboyList"
            :options="classList"
            multiple
            placeholder="">
          <div slot="value-label" slot-scope="{ node }">{{ node.raw.name }}</div>
          <label slot="option-label" slot-scope="{ node, labelClassName}" :class="labelClassName">
            {{ node.raw.name }}
          </label>
        </tree-select>
      </div>
    </div>

    <div class="task-action">
      <div
          class="button-review"
          @click="saveTask"
      >
        Сохранить
      </div>
      <div
          class="button-clear"
          @click="clear"
      >
        Сбросить
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import http from '@/http/http';

import TeacherTask from '@/domain/TeacherTask';
import TestTask from '@/domain/TestTask';
import route from '@/mixins/route';

export default {
  name: 'TeacherTask',
  mixins: [route],
  data() {
    return {
      task: null,
      classList: [],
    }
  },
  async created() {
    this.classList = await http.getClassList();
    if (this.$route.params.id) {
      setTimeout(() => {
        this.task = this.TEACHER_TASK_LIST.find(task => task.id === this.$route.params.id);
      }, 60);
    } else {
      this.task = new TeacherTask();
      this.task.testTaskList.push(new TestTask());
    }
  },
  computed: {
    ...mapGetters(['TEACHER_TASK_LIST', 'TEACHER']),
  },
  methods: {
    clear() {
      this.task.testTaskList = [{ input: null, output: null }];
    },
    async saveTask() {
      this.task.teacherId = this.TEACHER.id;
      const isSaved = await http.saveTask(this.task);
      if (isSaved) {
        const foundTask = this.TEACHER_TASK_LIST.find(ts => ts.id);
        if (!foundTask) {
          this.TEACHER_TASK_LIST.push(this.task);
        }
        await this.$router.push({ name: 'teacher' });
      }
    },
    handleTab(e, propName) {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.task[propName] = this.task[propName].concat('  ');
      }
    },
    addNewTestData() {
      this.task.testTaskList.push(new TestTask());
    }
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
    font-weight: 600
    font-size: 18px
    line-height: 22px

  .task-info
    width: 25vw
    padding: 30px
    background: #463698
    display: flex
    flex-direction: column
    overflow: auto

  .description
    margin-top: 10px
    padding: 20px
    min-height: 300px

  .test-data-space
    width: 55vw
    padding: 30px 20px
    background: #352872
    overflow: auto

  .test-data
    display: flex
    flex-direction: column
    &:not(:first-child)
      margin-top: 20px

  .test-data-title
    font-size: 22px
    margin-bottom: 20px

  .input-task
    width: 460px
    margin-top: 15px
    line-height: 48px
    padding-left: 20px

  .class-select
    width: 20vw
    padding: 20px
    background: #120D26
    line-height: 40px

  .task-action
    height: 9.7vh
    margin-left: 25vw
    display: flex
    align-items: center
    column-gap: 20px


  .input
    background: #5843BE
    border-radius: 10px
    outline: none
    border: none
    resize: none
    color: #FFFFFF
    margin-bottom: 10px

  .input-name
    margin-top: 5px
    padding: 20px
    line-height: 10px

    &::placeholder
      color: #FFFFFF
      opacity: 0.8

  .icon-add-overlay
    border-radius: 10px
    border: 2px solid #00D1FF
    padding: 10px
    width: fit-content
    cursor: pointer

  .add-first
    margin-bottom: 60px
</style>