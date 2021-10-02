import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';
import { UserEntity } from './interfaces/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-user')
  async findUsers(): Promise<UserEntity[]> {
    return this.appService.findUsers();
  }

  @MessagePattern('find-user')
  async findUser(@Payload() data: any): Promise<User> {
    return this.appService.findUser(Number(data.value.id));
  }

  @MessagePattern('create-user')
  async createUser(@Payload() data: any): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)}`);
    return await this.appService.createUser(data.value);
  }

  @MessagePattern('update-user')
  async updateUser(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);
    await this.appService.updateUser(data.value);
  }

  @MessagePattern('delete-user')
  async removeUser(@Payload() data: any): Promise<void> {
    return this.appService.deleteUser(Number(data.value.id));
  }

  @MessagePattern('active-user')
  async activeUser(@Payload() data: any): Promise<void> {
    return this.appService.activeUser(Number(data.value.id));
  }

  @MessagePattern('inactive-user')
  async inactiveUser(@Payload() data: any): Promise<void> {
    return this.appService.inactiveUser(Number(data.value.id));
  }
}
