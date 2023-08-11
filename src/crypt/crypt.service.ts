import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"

@Injectable()
export class CryptService {
    private SALT = 10;

    hash(rawPassword: string){
        return bcrypt.hashSync(rawPassword, this.SALT)
    }

    compare(encryptedPassword: string, password: string){
        return bcrypt.compareSync(password, encryptedPassword)
    }
}
