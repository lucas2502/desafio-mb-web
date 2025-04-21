
const apiBaseURL = import.meta.env?.VITE_API_URL;
export class UsersService {
  constructor(httpAdapter) {
    this.httpAdapter = httpAdapter
  }

  async createUser(input) {
    const url = `${apiBaseURL}/api/v1/registration`

    const res = await this.httpAdapter.post({ url, body: { ...input } })
    return res.data
  }
}
