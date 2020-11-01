<template>
  <div class="list-container" v-if="isRouteAvailable('SCHOOLBOY')">
    <div v-if="isShowGrid" class="header">
      <div class="title">
        Домашние задания
        <span>{{`(${taskList.length})`}} </span>
      </div>
      <div class="filter">
          Показывать выполненные
        <custom-switcher @click="filterTaskList"/>
      </div>
    </div>
    <div v-if="isShowGrid"
         class="task-grid"
    >
      <schoolboy-task-card
          v-for="(task, key) in taskList"
          :task="task" :key="key" />
    </div>
    <div v-else class="none-task">У вас еще нет домашних заданий</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SchoolboyTaskCard from '@/pages/schoolboy/task-list/SchoolboyTaskCard';
import route from '@/mixins/route';

export default {
  name: 'SchoolboyTaskList',
  components: {
    SchoolboyTaskCard,
  },
  mixins: [route],
  created() {
    setTimeout(() => {
      this.taskList = this.SCHOOLBOY_TASK_LIST;
      this.firstDumpTaskList = this.SCHOOLBOY_TASK_LIST;
    }, 100);
  },
  data() {
    return {
      firstDumpTaskList: [],
      isDumpComplete: false,
      taskList: [],
    }
  },
  computed: {
    isShowGrid() {
      return this.SCHOOLBOY_TASK_LIST.length > 0;
    },
    ...mapGetters(['SCHOOLBOY_TASK_LIST', 'USER'])
  },
  methods: {
    filterTaskList(isChecked) {
      if (isChecked) {
        this.taskList = this.taskList.filter(task => task.bestResult === 100);
      } else {
        this.taskList = this.firstDumpTaskList;
      }
    }
  },
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
</style>