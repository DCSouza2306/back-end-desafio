import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/decorators/users.decorator';
import { AuthLoginDTO } from './dtos/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return await this.authService.login(body)
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async me(@Users() user){
    return {
      "me": user
    }
  }
}
