import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import UsersService from './users.service';
import CreateUserDto from './dto/create-user.dto';
import User from './entities/user.entity';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
}
