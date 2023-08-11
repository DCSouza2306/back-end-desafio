import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDTO } from './dto/create.user.dto';
import { CryptService } from 'src/crypt/crypt.service';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,
        private readonly cryptService: CryptService
        ){  }

    async getByEmail(email: string){
        return await this.userRepository.getByEmail(email);
    }

    async getById(id: number){
        return await this.userRepository.getById(id);
    }

    async create(user: CreateUserDTO){
        const userExist = await this.userRepository.getByEmail(user.email)
        if(userExist) throw new ConflictException();
        
        user.password = this.cryptService.hash(user.password)
        return await this.userRepository.create(user);
    }

    async getAll(){
        return await this.userRepository.getAll()
    }
}
