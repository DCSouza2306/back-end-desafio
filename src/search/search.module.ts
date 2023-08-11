import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HttpModule } from '@nestjs/axios';
import { CitiesModule } from 'src/cities/cities.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, CitiesModule, AuthModule, UserModule],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
