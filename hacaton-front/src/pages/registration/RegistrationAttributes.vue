<template>
  <form class="login-container">
    <div class="create">
      Создать учетную запись
    </div>
    <custom-input
        ref="input_login"
        type="text"
        placeholder="Login"
        v-model="login"
    />
    <custom-input
        ref="input_password"
        type="password"
        placeholder="Password"
        v-model="password"
    />
     <custom-input
        ref="input_mail"
        type="text"
        placeholder="E-mail"
        v-model="email"
    />
    <custom-input
        ref="input_name"
        type="text"
        placeholder="ФИО"
        v-model="name"
    />
     <custom-input
        ref="input_birthday"
        type="date"
        placeholder="Дата "
        v-model="birthday">
     </custom-input>
    <custom-input
        ref="input_edu_org"
        type="text"
        placeholder="Образовательная организация"
        v-model="edu"
    />
     <div class="agreement">
      <agreement-icon  v-model="isTeacher"/>
      <span class="agreement-text">
          Вы учитель?
      </span>
    </div>
    <div class="agreement">
      <agreement-icon/>
      <span class="agreement-text">
          Нажимая на кнопку “Регистрация” , вы принимаете условия пользовательского соглашения
      </span>
    </div>
    <div>
      <button
          class="button"
          :class="{ 'disabled': isError() }"
          type="button"
          @click="registration()"
      >
        Регистрация
      </button>
    </div>
    <div class="account">
      Уже есть аккаунт?
      <a class="source" href="" @click.prevent="$router.push({ name: 'login'})">
        Авторизоваться
      </a>
    </div>
  </form>
</template>

<script>
import http from '@/http/http';

import { mapActions, mapGetters } from 'vuex';

import AgreementIcon from '@/pages/registration/AgreementIcon';
import { createGuid } from '@/utils/utils';

export default {
  name: 'RegistrationAttributes',
  components: {
    AgreementIcon
  },
  data() {
    return {
      login: null,
      password: null,
      email: null,
      name: null,
      birthday:null,
      edu:null,
      isTeacher: false,
    };
  },
  computed: {
    ...mapGetters(['USER']),
  },
  methods: {
    async registration() {
      if (!this.isError()) {
        const fioArray = this.name.split(' ');
        const secondName = fioArray[0];
        const firstName = fioArray[1];
        const middleName = fioArray[2];

        const user = {
          id: createGuid(),
          secondName,
          firstName,
          middleName,
          login: this.login,
          password: this.password,
          email: this.email,
          birthday: this.birthday,
          edu: this.edu,
          role: this.isTeacher ? 'TEACHER' : 'SCHOOLBOY',
        };
        await http.saveUser(user);
      }
    },
    isError() {
      if (this.$refs.input_login && this.$refs.input_password) {
        const isLoginNull = this.$refs.input_login.$v.$error;
        const isPasswordNull = this.$refs.input_password.$v.$error;
        return isLoginNull || isPasswordNull;
      }
      return true;
    },
    ...mapActions(['GET_USER']),
  },
}
</script>

<style lang="sass" scoped>
.login-container
  margin-top: 110px
  width: 380px
  background: #FFFFFF
  display: grid
  grid-template-rows: 60px 50px 50px 50px 50px 50px 50px 20px 50px 50px 40px
  grid-template-columns: 100%
  grid-gap: 20px

.create
  display: flex
  justify-content: center
  align-items: center
  color: #000000
  font-style: normal
  font-weight: bold
  font-size: 14px
  line-height: 17px
  text-transform: uppercase

.agreement
  display: flex
  align-items: center

  .agreement-text
    margin-left: 10px
    color: #000000
    line-height: 17px

.button
  width: 100%
  height: 100%
  outline: none
  background: #5843BE
  border-radius: 10px
  font-weight: bold
  line-height: 17px
  color:  #FFFFFF
  text-transform: capitalize
  cursor: pointer
  border-color: transparent

  &:hover
    background: #6346EF

  &:active
    background: #3D28A7

  &.disabled
    background: #cccc
    cursor: default

.account
  margin-top: -5px
  display: flex
  flex-direction: column
  line-height: 17px

.source
  &:link
    color: #000000
</style>