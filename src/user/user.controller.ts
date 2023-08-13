import { Controller, Body, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){};

    @Post("sign-up")
    async createUser(@Body() body: CreateUserDTO){
        return await this.userService.create(body);
    }
}
