import ClassSchoolboy from '@/domain/ClassSchoolboy';
import { createGuid } from '@/utils/utils';
import TestTask from "@/domain/TestTask";

export default class TeacherTask {

    constructor(data = {}) {
        this.id = data.id || createGuid();
        this.teacherId = data.teacherId || null;
        this.name = data.name || null;
        this.description = data.description || '';
        this.legend = data.legend || null;
        this.testTaskList = data.testTaskList && data.testTaskList.length > 0
            ? data.testTaskList.map(test => new TestTask(test))
            : []
        this.classSchoolboyList= data.classSchoolboyList && data.classSchoolboyList.length > 0
            ? data.classSchoolboyList.map(cl => new ClassSchoolboy(cl))
            : []
    }
}