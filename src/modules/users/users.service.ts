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

  private async isFieldTaken(
    field: keyof User,
    value: string,
  ): Promise<boolean> {
    const count = await this.usersRepository.count({
      where: { [field]: value },
    });
    return count > 0;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    return this.isFieldTaken('email', email);
  }

  async isPhoneTaken(phone: string): Promise<boolean> {
    return this.isFieldTaken('phone', phone);
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    return this.isFieldTaken('username', username);
  }

  async validateUniqueFields(signUpData: CreateUserDto): Promise<void> {
    const fieldsToValidate: (keyof CreateUserDto)[] = [
      'email',
      'phone',
      'username',
    ];

    const validations = fieldsToValidate.map((field) => ({
      field,
      check: () => this.isFieldTaken(field, signUpData[field]),
    }));

    const takenFields = await Promise.all(
      validations.map(async ({ field, check }) =>
        (await check()) ? field : null,
      ),
    );

    const conflictingFields = takenFields.filter(Boolean);

    if (conflictingFields.length > 0) {
      throw new HttpException(
        `User with the following already exists: ${conflictingFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
