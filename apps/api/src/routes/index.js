import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { UsersRepositoryInMemory } from "../repositories/in-memory/UsersRepositoryInMemory.js";
import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase.js";
import { CreateUserController } from "../useCases/CreateUser/CreateUserController.js";

const routes = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersRepository = new UsersRepositoryInMemory();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

routes.post('/registration', async (request, response) => {
    return await new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(createUserController.handle(request, response));
            }, 1000);
        } catch (err) {
            return reject(err);
        }
    });


});

routes.get('/registration', (request, response) => {
    return response.sendFile(path.join(__dirname, "../dist/index.html"));
});

export { routes }