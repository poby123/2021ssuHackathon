import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  async findOneWith(id: string): Promise<User> {
    const result = await this.userRepository.find({ relations: ["market"] });
    const user = result.find((user: User) => {
      if (user.userId === id) {
        return true;
      }
    })

    return user;
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }


  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }

}