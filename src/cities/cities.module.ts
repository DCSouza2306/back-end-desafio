import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesRepository } from './repository/cities.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [CitiesService, CitiesRepository, PrismaService],
  controllers: [CitiesController],
  exports: [CitiesService]
})
export class CitiesModule {}
