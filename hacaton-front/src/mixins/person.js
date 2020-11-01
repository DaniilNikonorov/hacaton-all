import { mapActions } from 'vuex';

const SCHOOLBOY = 'SCHOOLBOY';
const TEACHER = 'TEACHER';
const ADMIN = 'ADMIN';

export default {
    methods: {
        async getPerson() {
            let userId = null;

            if (this.USER) {
                userId = this.USER.id;
            } else if (localStorage.getItem('userId')) {
                userId = localStorage.getItem('userId');
            }

            if (userId && localStorage.getItem('role') === SCHOOLBOY) {
                await this.GET_SCHOOLBOY(userId);
            } else if (userId && localStorage.getItem('role') === TEACHER) {
                await this.GET_TEACHER(userId);
            } else if (userId && localStorage.getItem('role') === ADMIN) {
                await this.GET_USER_BY_ID(userId);
            }
        },
        ...mapActions(['GET_SCHOOLBOY', 'GET_TEACHER', 'GET_USER_BY_ID']),
    }
};