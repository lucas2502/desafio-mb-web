import { Router } from "express";
import path from 'path';
import { CreateUserController } from "../useCases/CreateUser/CreateUserController.js";
import { fileURLToPath } from 'url';

const createUserController = new CreateUserController();
const routes = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

routes.post('/registration', (request, response) => {
    return createUserController.handle(request, response);
});

routes.get('/registration', (request, response) => {
    return response.sendFile(path.join(__dirname, "../../../ui/dist/index.html"));
});

export { routes }