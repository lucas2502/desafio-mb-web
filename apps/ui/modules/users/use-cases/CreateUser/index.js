import { UsersServiceMock } from '../../services/UsersServiceMock';
import { UsersService } from '../../services/UsersService';
import Helper from '../../../../core/helpers/Helper';
import { HttpAdapter } from '../../../../core/adapter/HttpAdapter';
import { CreateUserUseCase } from './CreateUserUseCase';

const MOCK = Helper.isTestMode()
const httpAdapter = new HttpAdapter();


const usersService = MOCK
  ? new UsersServiceMock()
  : new UsersService(httpAdapter);

const createUserUseCase = new CreateUserUseCase(usersService);

export default createUserUseCase;
