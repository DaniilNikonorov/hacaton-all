<template>
  <div class="user-menu">
    <custom-icon
        name="user"
        container-size="medium"
        color="#7F7F7F" />
    <header-checker v-model="isUserMenuShow"/>
    <div class="menu" v-show="isUserMenuShow">
      <div
          v-for="(row, key) in menuRows"
          :key="key"
          class="row-menu"
          @click="goTo(row)"

      >
        <custom-icon :name="row.icon"/>
        {{ row.label }}
      </div>
    </div>
  </div>
</template>

<script>
import HeaderChecker from '@/components/checker/HeaderChecker';
import { mapGetters, mapMutations } from 'vuex';

const menuValues = {
  teacherTaskList: {
    routeName: 'teacher',
    label: 'Вернуться к списку',
    icon: 'form',
  },
  schoolboyTaskList: {
    routeName: 'schoolboy',
    label: 'Вернуться к списку',
    icon: 'form',
  },
  exit: {
    routeName: 'login',
    label: 'Выйти',
    icon: 'circle-arrow-left',
  },
}

export default {
  name: 'UserMenu',
  components: {
    HeaderChecker
  },
  data() {
    return {
      isUserMenuShow: false,
    };
  },
  computed: {
    menuRows() {
      let menuRows = [];
      if (this.TEACHER && this.$route.name === 'teacher-task') {
        menuRows.push(menuValues.teacherTaskList);
      }
      if (this.SCHOOLBOY && this.$route.name === 'schoolboy-task') {
        menuRows.push(menuValues.schoolboyTaskList);
      }
      menuRows.push(menuValues.exit);
      return menuRows;
    },
    ...mapGetters(['SCHOOLBOY', 'TEACHER', 'USER']),
  },
  methods: {
    goTo(row) {
      if (row.routeName === 'login') {
        this.CLEAR_USER();
        this.CLEAR_SCHOOLBOY();
        this.CLEAR_TEACHER();
      }
      this.isUserMenuShow = false;
      this.$router.push({ name: row.routeName });
    },
    ...mapMutations(['CLEAR_USER', 'CLEAR_SCHOOLBOY', 'CLEAR_TEACHER'])
  }
};
</script>

<style lang="sass" scoped>

.user-menu
  position: relative
  background: #404040
  border-radius: 10px
  display: flex
  align-items: center
  justify-content: space-between
  column-gap: 20px
  padding: 1.15vh 20px

.menu
  position: absolute
  width: 220px
  left: -50px
  top: 8.5vh
  padding: 0 10px
  background: #404040
  border: 2px solid #404040
  border-radius: 5px
  display: flex
  flex-direction: column
  z-index: 10

  .row-menu
    display: flex
    align-items: center
    justify-content: flex-start
    cursor: pointer
    opacity: 0.6
    line-height: 40px
    column-gap: 10px
    &:hover
      opacity: 1
    &:not(:last-child)
      padding-bottom: 10px

</style>