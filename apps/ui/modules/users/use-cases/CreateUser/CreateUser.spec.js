import { CreateUserUseCase } from './CreateUserUseCase';
import { vi } from 'vitest';
import { UsersServiceMock } from '../../services/UsersServiceMock';
import { ErrorCodeEnum } from '@/core/enums/ErrorCodeEnum';


describe('UseCase: Users/CreateUser', () => {
  let useCase;
  let service;

  beforeAll(async () => {
    service = new UsersServiceMock();
    useCase = new CreateUserUseCase(service)
  });


  const payloadPerson = {
    email: 'lucas@email.com',
    type: 'person',
    person: {
      name: 'Lucas',
      cpf: '761.996.070-82',
      dateOfbirth: '25/02/1995',
      phone: '(61) 986245829',
    },
    company: {
      name: undefined,
      cnpj: undefined,
      openingDate: undefined,
      phone: undefined,
    },
    password: 'mb@123'
  }

  const payloadCompany = {
    email: 'lucas@email.com',
    type: 'company',
    person: {
      name: undefined,
      cpf: undefined,
      dateOfbirth: undefined,
      phone: undefined,
    },
    company: {
      name: 'Lucas LTDA',
      cnpj: '828.331.330/0001-03',
      openingDate: '25/02/1995',
      phone: '(61) 986245829',
    },
    password: 'mb@123'
  }

  test('should post user person with success', async () => {
    const useCase = new CreateUserUseCase(service)
    const res = await useCase.execute(payloadPerson);

    expect(res.isRight()).toBe(true);

    const successValue = res.value.getValue();
    expect(successValue).toBeDefined();
  });

  test('should post user company with success', async () => {
    const useCase = new CreateUserUseCase(service)
    const res = await useCase.execute(payloadCompany);

    expect(res.isRight()).toBe(true);

    const successValue = res.value.getValue();
    expect(successValue).toBeDefined();
  });



  test('should return Unexpected Error', async () => {
    const spy = vi.spyOn(service, 'createUser');
    spy.mockImplementationOnce(() => Promise.reject(new Error('Unexpexted error')));

    const useCase = new CreateUserUseCase(service);

    const res = await useCase.execute(payloadPerson);

    expect(res.isRight()).toBe(false);

    const errorValue = res.value.errorValue();

    expect(errorValue.code).toBe(ErrorCodeEnum.UnexpectedError);
  });

  test('should return Bad Request Error', async () => {
    const spy = vi.spyOn(service, 'createUser');
    spy.mockImplementationOnce(() => Promise.reject(new Error('Bad Request')));

    const useCase = new CreateUserUseCase(service);

    const res = await useCase.execute(payloadPerson);

    expect(res.isRight()).toBe(false);

    const errorValue = res.value.errorValue();

    expect(errorValue.code).toBe(ErrorCodeEnum.BadRequest);
  });

  test('should return Not Found Error', async () => {
    const spy = vi.spyOn(service, 'createUser');
    spy.mockImplementationOnce(() => Promise.reject(new Error('404 Not Found')));

    const useCase = new CreateUserUseCase(service);

    const res = await useCase.execute(payloadPerson);

    expect(res.isRight()).toBe(false);

    const errorValue = res.value.errorValue();

    expect(errorValue.code).toBe(ErrorCodeEnum.NotFound);
  });
});
