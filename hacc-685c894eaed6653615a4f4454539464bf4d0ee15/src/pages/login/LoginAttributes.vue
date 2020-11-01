<template>
  <form class="login-container">
    <div class="create">
      Авторизоваться
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
    <div>
      <button
          class="button"
          :class="{ 'disabled': isError() }"
          type="button"
          @click="logIn()"
      >
        Авторизоваться
      </button>
    </div>
    <div class="account">
      <a href="" class="source" @click.prevent="$router.push({ name: 'registration' })">
        Зарегистрироваться
      </a>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginAttributes',
  data() {
    return {
      login: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters(['USER']),
  },
  methods: {
    async logIn() {
      if (!this.isError()) {
        console.log(this.USER);
        await this.GET_USER({ login: this.login, password: this.password});
        if (this.USER) {
          console.log(this.USER);
          localStorage.setItem('userId', this.USER.id);
          localStorage.setItem('role', this.USER.role);
          const routerName = this.USER.role.toLowerCase();
          await this.$router.push(routerName);
        }
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
    ...mapActions(['GET_USER']  ),
  },
}
</script>

<style lang="sass" scoped>


.login-container
  margin-top: 220px
  width: 380px
  background: #FFFFFF
  display: grid
  grid-template-rows: 60px 50px 50px 50px 50px 40px 800px
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
  align-items: flex-start
  justify-content: space-between

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
  margin-top: -10px
  display: flex
  flex-direction: column
  line-height: 17px

.source
  &:link
    color: #000000
</style>