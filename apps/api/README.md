
## API POST - Contract
- Steps 1,2,3 and 4

1- POST (adress and type)
2- PATH (person or company)
3- PATH (password)
4- PATH (adress, person or company, password)

interface User {
    email: string; // required and e-mail validation
    type: 'person' | 'company'; // required and type validation
    name: string;
    document: string; // required and CPF| CNPJ validation
    date: string;
    phone: string;
    password: string; // required, min and max validation
}