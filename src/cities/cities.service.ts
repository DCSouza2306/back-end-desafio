import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './repository/cities.repository';
import { CityDTO } from './dtos/city.dto';

@Injectable()
export class CitiesService {
    constructor (private readonly citiesRepository: CitiesRepository){}
    async findAll(){
        return await this.citiesRepository.findAll()
    }

    async delete(id: number){
        return await this.citiesRepository.delete(id);
    }
}
