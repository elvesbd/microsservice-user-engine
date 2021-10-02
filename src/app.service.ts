import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.interface';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ where: { status: 'ACTIVE' } });
  }

  async findUser(userId: number): Promise<User> {
    const { id, name, email, phone, status } =
      await this.usersRepository.findOne(userId);
    const user: User = {
      id,
      name,
      email,
      phone,
      status,
    };
    return user;
  }

  async createUser(user: User): Promise<UserEntity> {
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async updateUser(userData: UserEntity): Promise<void> {
    const { id } = userData;

    await this.usersRepository.update(id, userData);
    const user = await this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  async activeUser(id: number): Promise<void> {
    await this.usersRepository.update(id, { status: 'ACTIVE' });
  }

  async inactiveUser(id: number): Promise<void> {
    await this.usersRepository.update(id, { status: 'INACTIVE' });
  }
}
