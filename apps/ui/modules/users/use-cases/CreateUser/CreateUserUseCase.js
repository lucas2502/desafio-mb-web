
import { left, right } from '../../../../core/base/Either';
import AppError from '../../../../core/base/AppError';
import { HttpHelper } from '../../../../core/helpers/HttpHelper';
import Helper from '../../../../core/helpers/Helper';
import Result from '../../../../core/base/Result';
import { ErrorCodeEnum } from '../../../../core/enums/ErrorCodeEnum';


export class CreateUserUseCase {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async execute(data) {


    try {

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
        email,
        name: personName ?? companyName,
        document: Helper.removeBlankSpaceAndSpecialCharsFromString(cpf ?? cnpj),
        date: Helper.parseYyyyMmDdToISODate(dateOfbirth ?? openingDate),
        phone: Helper.removeBlankSpaceAndSpecialCharsFromString(personPhone ?? companyPhone)
      };


      const response = await this.usersService.createUser(input);
      return right(Result.ok(response));
    } catch (error) {
      if (HttpHelper.isUnauthorizedError(error)) {
        return left(new AppError.Unauthorized(error));
      }

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
