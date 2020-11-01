import axios from 'axios';
import TrySchoolboy from "@/domain/TrySchoolboy";
import ClassSchoolboy from "@/domain/ClassSchoolboy";
import User from "@/domain/User";
import TeacherTask from "@/domain/TeacherTask";

axios.defaults.baseURL = 'https://hacaton-backend.herokuapp.com/';
const executeUrl = 'https://codeexecutor.herokuapp.com/';

const baseImort = {
    java: 'import java.util.*; import java.lang.*; \n',
    c: '#include <stdio.h> \n',
    cpp: '#include <iostream> \n',
}

export default {
    getUser(login, password) {
        return axios.get(`user/auth?login=${login}&password=${password}`);
    },

    getUserById(userId) {
        return axios.get(`user/${userId}`);
    },

    async getAllUser() {
        const response = await axios.get('user/');
        return response && response.data
            ? response.data.map(us => new User(us))
            : [];
    },

    async deleteUserById(userId) {
        await axios.delete(`user/delete/${userId}`)
            .then(() => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            })
    },

    getSchoolboy(userId) {
        return axios.get(`schoolboy/${userId}`);
    },

    getTeacher(userId) {
        return axios.get(`teacher/${userId}`);
    },

    async getAllTries(schoolboyId, taskId) {
        const response = await axios.get(`try/${schoolboyId}?taskId=${taskId}`);
        if (response && response.data) {
            return response.data.map(tr => new TrySchoolboy(tr));
        }
    },
    async saveTry(trySchoolboy) {
        const response = await axios.post(`try/save`, trySchoolboy);
        if (response && response.data) {
            return new TrySchoolboy(response.data);
        }
    },
    async getClassList() {
        const response = await axios.get('class-schoolboy/');
        return response && response.data ? response.data.map(cl => new ClassSchoolboy(cl)) : [];
    },
    async saveTask(taskTeacher) {
        const response = await axios.post(`task/save`, taskTeacher);
        return response && response.data;
    },
    async getAllTasks() {
        const response = await axios.get('task/');
        return response && response.data
            ? response.data.map(us => new TeacherTask(us))
            : [];
    },
    async deleteTaskById(userId) {
        await axios.delete(`task/delete/${userId}`)
            .then(() => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            })
    },
    async saveUser(user) {
        await axios.post('user/save', user)
            .then(() => {
                alert('Пользователь успешно зарегестрирован');
            })
            .catch(() => {
                console.log('Такой пользователь уже существует');
                return false;
            });
    },

    async getAllTestCases(taskId) {
        const response = await axios.get(`task/test-cases/${taskId}`)
        return response && response.data;
    },

    async executeTestCase(code, testCase, lang) {
        const executionCode = baseImort[lang].concat(code);
        const response =  await axios.post(`${executeUrl}execute/runCode?timeoutInSec=10&lang=${lang}&taskId=${testCase.id}`,
            executionCode,
            { headers: { 'Content-Type': 'application/json', },});
        return response && response.data;
    }
};