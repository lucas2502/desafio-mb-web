
const apiBaseURL = import.meta.env?.VITE_API_URL;
export class UsersService {
  constructor(httpAdapter) {
    this.httpAdapter = httpAdapter
  }

  async createUser(input) {
    const {
      email,
      type,
      password,
      person,
      company
    } = input

    const body = {
      email,
      type,
      password,
      person,
      company
    }

    const url = `${apiBaseURL}/api/v1/registration`
    console.log({ url })
    const res = await this.httpAdapter.post({ url, body })
    return res.data
  }
}
