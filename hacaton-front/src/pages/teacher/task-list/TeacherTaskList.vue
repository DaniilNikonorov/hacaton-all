<template>
  <div class="list-container" v-if="isRouteAvailable('TEACHER')">
    <div class="header">
      <div class="title">
        Домашние задания
        <span>{{`(${taskList.length})`}} </span>
      </div>
      <div class="filter">
        Показывать выполненные
        <custom-switcher @click="filterTaskList"/>
      </div>
    </div>
    <div
         class="task-grid"
    >
      <div class="create-task">
        <div class="create-icon-overlay" @click="$router.push({ name: 'teacher-task', id: '' })">
          <custom-icon name="plus"/>
        </div>
      </div>
      <teacher-task-card
          v-for="(task, key) in taskList"
          :task="task" :key="key" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TeacherTaskCard from '@/pages/teacher/task-list/TeacherTaskCard';
import route from '@/mixins/route';

export default {
  name: 'SchoolboyTaskList',
  components: {
    TeacherTaskCard,
  },
  mixins: [route],
  data() {
    return {
      firstDumpTaskList: [],
      isDumpComplete: false,
      taskList: [],
    }
  },
  computed: {
    ...mapGetters(['TEACHER_TASK_LIST'])
  },
  methods: {
    // TODO
    filterTaskList() {
      return this.taskList;
    }
  },
  watch: {
    TEACHER_TASK_LIST: {
      immediate: true,
      handler(val) {
        if (val.length > 0  && !this.isDumpComplete) {
          this.firstDumpTaskList = JSON.parse(JSON.stringify(val));
          this.taskList = JSON.parse(JSON.stringify(val));
          this.isDumpComplete = true;
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>

  .list-container
    width: 1100px
    margin: 0 auto

  .header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 20px 17px
    margin-bottom: 20px


  .title
    font-weight: bold
    font-size: 34px
    line-height: 29px
    color: #000000
    text-align: center

    span
      opacity: 0.5

  .task-grid
    display: grid
    grid-template-columns:  1fr 1fr 1fr 1fr
    justify-items: center

  .none-task
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    font-size: 18px
    line-height: 22px
    color: #000000

  .filter
    font-size: 14px
    line-height: 17px
    color: #000000
    display: flex
    align-items: center

    *
      &:last-child
        margin-left: 14px

  .create-task
    width: 240px
    height: 252.88px
    border: 1px solid #5843BE
    border-radius: 10px
    margin-bottom: 20px
    display: flex
    justify-content: center
    align-items: center

  .create-icon-overlay
    background: #5843BE
    border-radius: 50%
    padding: 20px
    cursor: pointer
</style>