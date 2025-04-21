export class UsersServiceMock {
  async createUser(_input) {
    return await new Promise((resolve, reject) => {

      try {
        setTimeout(() => {
          return resolve('ok')
        }, 1000)
      } catch (err) {
        return reject(err)
      }
    })
  }
}
