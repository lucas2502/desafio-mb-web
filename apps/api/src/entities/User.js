import { v4 as uuid } from 'uuid';

export class User {
    constructor({ props }) {
        const { email, type, password, name, document, date, phone } = props

        this.email = email
        this.type = type
        this.password = Buffer.from(password, 'binary').toString('base64')
        this.name = name
        this.document = document
        this.date = date
        this.phone = phone
        this.id = props?.id ?? uuid()
    }
}
