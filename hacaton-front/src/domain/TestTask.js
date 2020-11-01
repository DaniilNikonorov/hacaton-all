import { createGuid } from '@/utils/utils';

export default class TeacherTask {

    constructor(data = {}) {
        console.log(data);
        this.id = data.id || createGuid();
        this.input = data.input || null;
        this.output = data.output || null;
    }
}