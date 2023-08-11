import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
    imports: [CryptModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, PrismaService],
    exports: [UserService]
})
export class UserModule {}
