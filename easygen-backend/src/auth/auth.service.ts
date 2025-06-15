import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hashed, match } from '../utils/password-utils';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneForAuth(signInDto.email);

    if (user === null) {
      throw new HttpException(
        'No account with provided email',
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordCorrect = await match(signInDto.password, user.password);
    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }

    return 'Successful Authentication';
  }
}
