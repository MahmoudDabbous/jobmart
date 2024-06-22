import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserRole } from 'src/database/entities/User';

export class CreateAdminDto extends CreateUserDto {
  readonly role = UserRole.ADMIN;
}
