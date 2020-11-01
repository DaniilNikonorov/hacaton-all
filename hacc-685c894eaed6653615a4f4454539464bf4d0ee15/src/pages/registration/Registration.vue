<template>
<div class="layout">
  <div class="icon-container__left">
    <img src="../../../public/icons/Schoolers.svg" class="schoolboy-icon"/>
  </div>
  <registration-attributes/>
  <div class="icon-container__right">
    <img src="../../../public/icons/Group.svg" class="teacher-icon"/>
    <img src="../../../public/icons/Question.svg" class="question-icon"/>
    <img src="../../../public/icons/Woman.svg" class="woman-icon"/>
  </div>
</div>
</template>

<script>
import RegistrationAttributes from '@/pages/registration/RegistrationAttributes';

export default {
  name: 'Registration',
  components: {
    RegistrationAttributes
  },
  created() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }
}
</script>

<style lang="sass" scoped>
.layout
  height: 50vh
  display: flex
  justify-content: center

.icon-container__left
  position: relative
  width: 30%
  height: 100vh
  padding-right: 20px

.schoolboy-icon
  position: absolute
  right: 20px
  top: 442px

.icon-container__right
  position: relative
  margin-left: 20px
  width: 30%
  height: 100vh

.teacher-icon
  position: absolute
  left: 0
  top: 70px

.question-icon
  position: absolute
  padding-left: 10px
  left: 0
  top: 310px

.woman-icon
  position: absolute
  padding-left: 10px
  left: 80px
  top: 500px
</style>