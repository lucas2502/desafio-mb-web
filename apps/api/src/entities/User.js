import { v4 as uuid } from 'uuid';

export class User {
    constructor({ props, id }) {
        const { email, type, password, person, company } = props

        this.email = email;
        this.type = type;
        this.password = Buffer.from(password, 'binary').toString('base64');
        this.person = person;
        this.company = company;
        this.id = id || uuid();
    }
}
