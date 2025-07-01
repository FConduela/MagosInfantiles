import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'editor';
  name: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$v30nrBc//pwYD7QPsc5U6.QKSjg8oMDyiUnKhnjiknit0Nt6vRCs6',
      role: 'admin',
      name: 'Administrador'
    },
    {
      id: 2,
      username: 'editor1',
      password: '$2b$10$gDrmGoLBCdNu6MWNUz8qg.pYdRMUNqs/i91eRYrpO3QSNl2D9nMea',
      role: 'editor',
      name: 'Editor Principal'
    },
    {
      id: 3,
      username: 'editor2',
      password: '$2b$10$NYlwXeUJM31ZpCNI5dKrgOBwqPnbqQV0YqaF6/opeWAr9uYGXaNte',
      role: 'editor',
      name: 'Editor Secundario'
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
} 