import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/decorators/users.decorator';
import { User } from '@prisma/client';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService){}

    @Get()
    async findAll(){
        return await this.citiesService.findAll()
    }

    @UseGuards(AuthGuard) 
    @Get()
    async findUserCities(@Users() reqUser: User){
        return await this.citiesService.findUserCities(reqUser.id)
    }

    @Delete()
    async delete(@Param("id", ParseIntPipe) id: number){
        return await this.citiesService.delete(id);
    }
}
