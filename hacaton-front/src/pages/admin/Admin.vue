<template>
 <div class="admin-container" v-if="isRouteAvailable('ADMIN')">
   <div class="off-canvas-menu" :class="{ 'shown': isShownMenu }">
     <custom-icon
         class="icon-menu"
         name="form"
         color="black"
         container-size="large"
         @click="isShownMenu=!isShownMenu"
     />
     <div v-if="isShownMenu">
       <div class="menu-row" @click="showTable('task')">
          <custom-icon name="admin-task" color="#66788A" container-size="medium"/>
          Домашние задания
       </div>
       <div class="menu-row" @click="showTable('user')">
          <custom-icon name="admin-user" color="#66788A" container-size="medium"/>
          Пользователи
       </div>
     </div>
   </div>
   <div class="table-container">
     <v-data-table
         v-if="isShownUserTable"
         ref="usertable"
         class="user-table"
         :headers="userTableHeaders"
         :items="users"
         show-select
         hide-default-footer
     >
        <template slot="no-data">
          <span>Данных не найдено</span>
        </template>
     </v-data-table>
     <v-data-table
         v-if="isShownTaskTable"
         ref="tasktable"
         class="user-table"
         :headers="taskTableHeaders"
         :items="tasks"
         show-select
         hide-default-footer
     >
       <template slot="no-data">
         <span>Данных не найдено</span>
       </template>
     </v-data-table>
     <div class="delete-icon" @click="deleteItems">
       <custom-icon name="trash"></custom-icon>
       Удалить
     </div>
   </div>
 </div>
</template>

<script>
import http from '@/http/http';
import route from '@/mixins/route';

export default {
  name: 'Admin',
  async created() {
    if (this.isRouteAvailable('ADMIN')) {
      this.users = await http.getAllUser();
      this.tasks = await http.getAllTasks();
    }
  },
  mixins: [ route ],
  data() {
    return {
      userTableHeaders: [
        { text: 'ФИО', value: 'name' },
        { text: 'Роль', value: 'roleName' },
      ],
      users: [],
      taskTableHeaders: [
        { text: 'Задание', value: 'name' },
        { text: 'Легенда', value: 'legend' },
        { text: 'Описание', value: 'description' },
      ],
      tasks: [],
      isShownMenu: false,
      isShownUserTable: true,
      isShownTaskTable: false,
    }
  },
  methods: {
    async deleteItems() {
      if (this.isShownUserTable) {
        await this.deleteUsers();
      }
      if (this.isShownTaskTable) {
        await this.deleteTasks();
      }
    },
    async deleteUsers() {
      const usersArray = this.$refs.usertable.selection;
      if (usersArray) {
        for (const usersArrayKey in usersArray) {
          if (usersArray[usersArrayKey].role !== 'ADMIN') {
            await http.deleteUserById(usersArray[usersArrayKey].id);
            this.users = this.users.filter(v => v.id !== usersArray[usersArrayKey].id);
          }
        }
      }
    },
    async deleteTasks() {
      const taskArray = this.$refs.tasktable.selection;
      if (taskArray) {
        for (const taskKey in taskArray) {
          await http.deleteTaskById(taskArray[taskKey].id);
          this.tasks = this.tasks.filter(v => v.id !== taskArray[taskKey].id);
        }
      }
    },
    showTable(tableName) {
      if (tableName === 'user') {
        this.isShownUserTable = true;
        this.isShownTaskTable = false;
      }
      if (tableName === 'task') {
        this.isShownTaskTable = true;
        this.isShownUserTable = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .admin-container
    display: flex
    padding: 60px

  .off-canvas-menu
    height: 100vh
    width: fit-content
    padding-right: 40px
    margin: 0

    &.shown
      width: 300px

  .user-table
    width: 70vw

  .icon-menu
    margin-bottom: 20px
    cursor: pointer

  .menu-row
    display: flex
    align-items: center
    line-height: 40px
    column-gap: 20px
    color: #66788A
    font-weight: 600
    font-size: 16px
    margin-bottom: 10px
    cursor: pointer
    padding-left: 5px

    &:hover
      background: #cccc
      border-radius: 10px

  .table-container
    position: relative

  .delete-icon
    position: absolute
    left: 0
    top: -50px
    padding: 10px 20px
    border-radius: 8px
    background: #5843BE
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.2)
    display: flex
    align-items: center
    justify-content: center
    column-gap: 10px
    cursor: pointer
    font-weight: 500
    font-size: 14px
    line-height: 16px
</style>