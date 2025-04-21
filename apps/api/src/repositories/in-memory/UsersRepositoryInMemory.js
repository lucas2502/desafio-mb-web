export class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async save(user) {
    this.users.push(user);
  }
}

