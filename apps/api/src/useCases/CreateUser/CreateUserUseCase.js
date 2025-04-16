
import { User } from "../../entities/User.js";


export class CreateUserUseCase {
    constructor(
        usersRepository
    ) {
        this.usersRepository = usersRepository
    }

    async execute(data) {

        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);


        if (!!userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User({ props: data });

        await this.usersRepository.save(user);
    }
}