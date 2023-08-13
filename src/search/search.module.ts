import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HttpModule } from '@nestjs/axios';
import { CitiesModule } from 'src/cities/cities.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CitiesRepository } from 'src/cities/repository/cities.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [HttpModule, CitiesModule, AuthModule, UserModule],
  providers: [SearchService, CitiesRepository, PrismaService],
  controllers: [SearchController]
})
export class SearchModule {}
