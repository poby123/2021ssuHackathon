import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  findOne(id: string): Promise<User[]> {
    return this.userRepository.find({ userId: id });
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
    if (!user.userId || !user.username || !user.password) {
      throw new HttpException('필수 필드가 비어있습니다', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.save(user);
  }


  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }

}