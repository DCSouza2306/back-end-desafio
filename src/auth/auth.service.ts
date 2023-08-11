import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptService } from 'src/crypt/crypt.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDTO } from './dtos/auth.login.dto';

@Injectable()
export class AuthService {
  private EXPIRATION = '7 days';
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: AuthLoginDTO) {
    const existingUser = await this.userService.getByEmail(user.email);
    if (!existingUser) throw new NotFoundException();

    const valid =  this.cryptService.compare(
      existingUser.password,
      user.password,
    );
    if (!valid) throw new UnauthorizedException();

    return  this.createToken(existingUser);
  }

  checkToken (token: string){
    try {
      const data = this.jwtService.verify(token);

      return data
    } catch (error) {
      console.log(error);
      throw new BadRequestException()
    }
  }

  private createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      {
        expiresIn: this.EXPIRATION,
      },
    );

    return { token };
  }
}
