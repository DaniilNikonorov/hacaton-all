import { createGuid } from '@/utils/utils';
import TeacherTask from '@/domain/TeacherTask';

export default class Teacher {
    constructor(data = {}) {
        this.id = data.id || createGuid();
        this.firstName = data.firstName || null;
        this.secondName = data.secondName || null;
        this.taskList = data.taskList && data.taskList.length > 0
            ? data.taskList.map(ts => new TeacherTask(ts))
            : [];
    }
}
