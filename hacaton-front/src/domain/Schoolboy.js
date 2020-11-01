import { createGuid } from '@/utils/utils';
import TaskSchoolboy from '@/domain/TaskSchoolboy';

export default class Schoolboy {

    constructor(data= {}) {
        this.id = data.id || createGuid();
        this.firstName = data.firstName || null;
        this.secondName = data.secondName || null;
        this.taskList = data.taskList && data.taskList.length > 0
            ? data.taskList.map(el => new TaskSchoolboy(el))
            : [];
    }
}