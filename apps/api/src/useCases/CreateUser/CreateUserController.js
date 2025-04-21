import {
    validateSchema
} from "./CreateUserValidation.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async handle(request, response) {
        const { email, type, password, person, company } = request.body;

        const validationResult = validateSchema({
            email,
            type,
            password,
            person,
            company
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
                person,
                company,
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

    // validateCommonFields({ email, type, password }) {
    //     const errors = [];
    //     if (Helper.isNotDefined(email) || Helper.isEmpty(email)) {
    //         errors.push("email");
    //     }
    //     if (Helper.isNotDefined(type) || Helper.isEmpty(type)) {
    //         errors.push("type");
    //     }
    //     if (Helper.isNotDefined(password) || Helper.isEmpty(password)) {
    //         errors.push("password");
    //     }

    //     return {
    //         hasError: !!errors.length,
    //         details: errors,
    //     };
    // }

    // validatePersonFields({ name, cpf, dateOfbirth, phone }) {
    //     const errors = [];
    //     if (Helper.isNotDefined(name) || Helper.isEmpty(name)) {
    //         errors.push("name");
    //     }
    //     if (Helper.isNotDefined(cpf) || Helper.isEmpty(cpf)) {
    //         errors.push("cpf");
    //     }
    //     if (Helper.isNotDefined(dateOfbirth) || Helper.isEmpty(dateOfbirth)) {
    //         errors.push("dateOfbirth");
    //     }
    //     if (Helper.isNotDefined(phone) || Helper.isEmpty(phone)) {
    //         errors.push("phone");
    //     }

    //     return {
    //         hasError: !!errors.length,
    //         details: errors,
    //     };
    // }

    // validateCompanyFields({ name, cnpj, openingDate, phone }) {
    //     const errors = [];
    //     if (Helper.isNotDefined(name) || Helper.isEmpty(name)) {
    //         errors.push("name");
    //     }
    //     if (Helper.isNotDefined(cnpj) || Helper.isEmpty(cnpj)) {
    //         errors.push("cnpj");
    //     }
    //     if (Helper.isNotDefined(openingDate) || Helper.isEmpty(openingDate)) {
    //         errors.push("openingDate");
    //     }
    //     if (Helper.isNotDefined(phone) || Helper.isEmpty(phone)) {
    //         errors.push("phone");
    //     }

    //     return {
    //         hasError: !!errors.length,
    //         details: errors,
    //     };
    // }
}
