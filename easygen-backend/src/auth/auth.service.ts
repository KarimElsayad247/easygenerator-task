import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { match } from 'src/utils/password-utils';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadSchema } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<AuthPayloadSchema> {
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

    const payload = { id: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
