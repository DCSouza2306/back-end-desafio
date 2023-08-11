import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptModule } from './crypt/crypt.module';
import { HttpModule } from '@nestjs/axios';
import { SearchModule } from './search/search.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [UserModule, AuthModule, CryptModule, SearchModule, CitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
