import {
    validateSchema
} from "./CreateUserValidation.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async handle(request, response) {
        const { email,
            type,
            password,
            name,
            document,
            date,
            phone } = request.body;

        const validationResult = validateSchema({
            email,
            type,
            password,
            name,
            document,
            date,
            phone
        });

        if (validationResult.hasError) {
            return response.status(400).json({
                message: "Fields are required",
                details: validationResult.details
            });
        }

        try {
            await this.createUserUseCase.execute({
                email,
                type,
                password,
                name,
                document,
                date,
                phone
            });

            return response.status(200).json({
                message: "Registration successful",
            });
        } catch (err) {

            if (err?.message === "User already exists.") {
                return response.status(400).json({
                    message: err.message,
                });
            }
            return response.status(500).json({
                message: err.message || "Unexpected error.",
            });
        }
    }


}
