import { createGuid } from '@/utils/utils';

export default class User {

    constructor(data = {}) {
        this.id = data.id || createGuid()
        this.login = data.login || null;
        this.role = ROLE[data.role] || null;
        this.firstName = data.firstName || null;
        this.secondName = data.secondName || null;
        this.middleName = data.middleName || null;
        this.name = this.getName()
        this.roleName = ROLE_NAME[this.role];
        this.email = data.email || null;
        this.phoneNumber = data.phoneNumber;
        this.edu = data.edu || null;
        this.birthday = data.birthday || null;
    }

    getName() {
        return [this.secondName, this.firstName, this.middleName].filter(v => !!v).join(' ')
    }

}

const ROLE = {
    SCHOOLBOY: 'SCHOOLBOY',
    TEACHER: 'TEACHER',
    ADMIN: 'ADMIN',
};

const ROLE_NAME = {
    SCHOOLBOY: 'Школьник',
    TEACHER: 'Учитель',
    ADMIN: 'Администратор',
}
