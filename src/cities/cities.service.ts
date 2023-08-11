import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './repository/cities.repository';
import { CityDTO } from './dtos/city.dto';

@Injectable()
export class CitiesService {
    constructor (private readonly citiesRepository: CitiesRepository){}
    async includeCity(city: CityDTO, user_id: number){
        return await this.citiesRepository.includeCity(city, user_id)
    }

    async findAll(){
        return await this.citiesRepository.findAll()
    }

    async findUserCities(userId: number){
        return await this.citiesRepository.findUserCities(userId);
    }

    async delete(id: number){
        return await this.citiesRepository.delete(id);
    }
}
