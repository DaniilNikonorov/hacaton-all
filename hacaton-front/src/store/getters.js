export default {
    USER(state) {
        return state.USER;
    },

    SCHOOLBOY(state) {
        return state.SCHOOLBOY;
    },

    SCHOOLBOY_TASK_LIST(state) {
        if (state.SCHOOLBOY) {
            return state.SCHOOLBOY.taskList;
        }
        return  [];
    },

    TEACHER(state) {
        return state.TEACHER;
    },

    TEACHER_TASK_LIST(state) {
        if (state.TEACHER) {
            return state.TEACHER.taskList;
        }
        return  [];
    },

    ACTIVE_TRY(state) {
        return state.ACTIVE_TRY;
    },
};