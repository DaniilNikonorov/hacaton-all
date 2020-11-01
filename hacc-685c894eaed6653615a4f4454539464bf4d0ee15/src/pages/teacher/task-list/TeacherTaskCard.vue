<template>
  <div class="task-card" v-if="task">
    <div class="task-title"> {{ task.name }}  </div>
    <div class="task-description"> {{ task.description }} </div>
    <div class="classes"> {{ classListForView }} </div>
    <div class="button" @click="goToTask(task.id)">Посмотреть</div>
  </div>
</template>

<script>

export default {
  name: 'TeacherTaskCard',
  props: {
    task: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      result: 0,
    }
  },
  computed: {
    classListForView() {
      if (this.task && this.task.classSchoolboyList.length > 0) {
        return this.task.classSchoolboyList.map(cl => cl.name).join(', ');
      }
      return '';
    }
  },
  methods: {
    goToTask(taskId) {
      this.$router.push({ name: 'teacher-task', params: { id: taskId} });
    }
  }
};
</script>

<style lang="sass" scoped>
.button
  padding: 17px
  background: #5843BE
  color: #FFFFFF
  border-radius: 10px
  display: flex
  justify-content: center
  align-items: center
  font-weight: bold
  font-size: 14px
  line-height: 17px
  text-transform: capitalize
  cursor: pointer

.classes
  padding: 25px 10px 15px 10px
  margin-bottom: 10px
  border-radius: 5px
  line-height: 20px
  background: #E5FAFF
  color: #00D1FF
  display: flex
  justify-content: center


</style>