import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/decorators/users.decorator';
import { User } from '@prisma/client';

type CidadePesquisa = {
    city: string
}

@Controller('search')
export class SearchController {
    constructor (private readonly searchService: SearchService){}

    @UseGuards(AuthGuard)
    @Post()
    async postCity(@Body() body: CidadePesquisa, @Users() reqUser: User){
        return await this.searchService.postCity(body.city, reqUser.id)
    };

    @UseGuards(AuthGuard)
    @Get()
    async getTemps(@Users() reqUser: User){
        return await this.searchService.getTemps(reqUser.id);
    }
}
