import http from '@/http/http';
import User from '@/domain/User';
import Schoolboy from '@/domain/Schoolboy';
import Teacher from "@/domain/Teacher";

export default {
   async GET_USER({ commit }, params) {
        const { login, password } = params;
        return http.getUser(login, password)
            .then(({ data }) => {
                const user = new User(data);
                commit('SET_USER', user);
            })
            .catch((er) => console.log(er))
    },
    GET_USER_BY_ID({ commit }, userId) {
        return http.getUserById(userId)
            .then(({ data }) => {
                const user = new User(data);
                commit('SET_USER', user);
            })
            .catch((er) => console.log(er))
    },

    GET_SCHOOLBOY({ commit }, userId) {
        return http.getSchoolboy(userId)
            .then(({ data }) => {
                const schoolboy = new Schoolboy(data);
                commit('SET_SCHOOLBOY', schoolboy);
            })
            .catch((er) => console.log(er));
    },

    GET_TEACHER({ commit }, userId) {
        return http.getTeacher(userId)
            .then(({ data }) => {
                const teacher = new Teacher(data);
                commit('SET_TEACHER', teacher);
            })
            .catch((er) => console.log(er));
    },
};