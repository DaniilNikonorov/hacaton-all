<template>
  <div id="app">
    <app-header v-if="isShowHeader"/>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/pages/app/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      routeName: ''
    };
  },
  computed: {
    isShowHeader() {
      const pageList = [
          'schoolboy',
          'schoolboy-task',
          'teacher',
          'teacher-task',
          'admin'
      ];

      return pageList.includes(this.routeName);
    }
  },
  watch: {
    '$route' (to) {
      this.routeName = to.name;
    },
  }
};
</script>
