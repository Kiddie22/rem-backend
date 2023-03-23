import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AuthHelpersService from 'src/auth/helpers/auth-helpers.service';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, refreshToken } = createUserDto;
    const user = this.usersRepository.create({
      username,
      password,
      email,
      refreshToken,
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      AuthHelpersService.throwErrorMessage(error);
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    user.refreshToken = updateUserDto.refreshToken;
    this.usersRepository.save(user);
    return user;
  }
}
