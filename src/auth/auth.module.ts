import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { UserModule } from 'src/user/user.module';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaClient, UserModule, CryptModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
