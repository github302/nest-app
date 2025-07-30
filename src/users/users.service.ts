import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'aaa',
      email: 'aaa@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'bbbb',
      email: 'bbbb@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'ccc',
      email: 'ccc@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'dddd',
      email: 'dddd@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'eee',
      email: 'eee@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleUsers = this.users.filter((user) => user.role === role);
      if (roleUsers.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return roleUsers;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Users Not Found');
    }
    return user;
  }
  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      ...user,
      id: usersByHighestId[0].id + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'ENGINEER' | 'INTERN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUser,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
