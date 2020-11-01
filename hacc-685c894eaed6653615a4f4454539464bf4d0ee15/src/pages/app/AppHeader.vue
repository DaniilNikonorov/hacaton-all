<template>
  <div class="title">
    <span class="project-logo">{{ welcome }}</span>
    <span class="task" v-if="isShowTaskNumber">{{ taskLabel }}</span>
    <user-menu/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UserMenu from '@/pages/app/UserMenu';
import person from '@/mixins/person';

export default {
  name: 'AppHeader',
  components: {
    UserMenu
  },
  mixins: [ person ],
  async created() {
    this.routeName = this.$route.name;
    await this.getPerson();
  },
  computed: {
    isShowTaskNumber() {
      return this.$route.name === 'schoolboy-task';
    },
    taskLabel() {
      if (this.SCHOOLBOY_TASK_LIST.length > 0) {
        const neededTask = this.SCHOOLBOY_TASK_LIST.find(task => task.id === this.$route.params.id);
        return `Задание ${neededTask.name}`
      }
      return '';
    },
    welcome() {
      if (this.USER) {
        return `Здравствуйте, ${this.USER.name}`;
      }
      return 'Здравствуйте!';
    },
    ...mapGetters(['SCHOOLBOY_TASK_LIST', 'USER']),
  }

};
</script>

<style lang="sass" scoped>
  .title
    height: 9.7vh
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 80px 0 40px
    background: #000000

  .project-logo
    font-weight: bold
    font-size: 14px
    line-height: 17px

  .task
    font-weight: 600
    font-size: 18px
    line-height: 22px
</style>