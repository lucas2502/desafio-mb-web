
import { left, right } from '../../../../core/base/Either';
import AppError from '../../../../core/base/AppError';
import { HttpHelper } from '../../../../core/helpers/HttpHelper';
import Helper from '../../../../core/helpers/Helper';
import Result from '../../../../core/base/Result';


export class CreateUserUseCase {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async execute(data) {
    const { email, type, password, person, company } = data

    const {
      name: personName,
      cpf,
      dateOfbirth,
      phone: personPhone } = person

    const {
      name: companyName,
      cnpj,
      openingDate,
      phone: companyPhone } = company

    const input = {
      email,
      type,
      password,
      person: {
        name: personName,
        cpf: Helper.removeSpecialCharsFromString(cpf),
        dateOfbirth: Helper.parseDdMmYyyyToIsoDate(dateOfbirth),
        phone: Helper.removeSpecialCharsFromString(personPhone)
      },
      company: {
        name: companyName,
        cnpj: Helper.removeSpecialCharsFromString(cnpj),
        openingDate: Helper.parseDdMmYyyyToIsoDate(openingDate),
        phone: Helper.removeSpecialCharsFromString(companyPhone)
      },
    };

    try {
      const response = await this.usersService.createUser(input);
      return right(Result.ok(response));
    } catch (error) {


      if (HttpHelper.isBadRequestError(error)) {
        return left(new AppError.BadRequest(error));
      }

      if (HttpHelper.isNotFoundError(error)) {
        return left(new AppError.DataNotFound(error));
      }

      return left(new AppError.UnexpectedError(error));
    }
  }
}
