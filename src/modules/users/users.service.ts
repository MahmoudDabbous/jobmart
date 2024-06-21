import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { User, UserRole } from 'src/database/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(userId: number) {
    const user = await this.usersRepository.findOneBy({ userId });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async isEmailTaken(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return true;
    }
    return false;
  }
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async createAdmin(adminData: CreateAdminDto) {
    const newAdmin = await this.usersRepository.create({
      ...adminData,
      role: UserRole.ADMIN,
    });
    await this.usersRepository.save(newAdmin);
    return newAdmin;
  }
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async update(userId: number, data: UpdateUserDto) {
    await this.usersRepository.update(userId, data);
    return await this.getById(userId);
  }
}
