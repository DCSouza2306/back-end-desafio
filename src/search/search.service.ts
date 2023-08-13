import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CitiesService } from 'src/cities/cities.service';
import { CityDTO } from 'src/cities/dtos/city.dto';
import { CitiesRepository } from 'src/cities/repository/cities.repository';

@Injectable()
export class SearchService {
  private KEY = '282138e7ca4db1d8c26eb5ba59d7b4a4';
  constructor(
    private readonly httService: HttpService,
    private readonly citiesRepository: CitiesRepository,
  ) {}

  async postCity(city: string, userId: number) {
    try {
      const response = await lastValueFrom(
        this.httService.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.KEY}&lang=pt_br`,
        ),
      );

      const cityInfo: CityDTO = {
        name: response.data.name,
        description: response.data.weather[0].description,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        icon: response.data.weather[0].icon,
        country: response.data.sys.country,
      };

      const userCities = await this.citiesRepository.findUserCities(userId);

      userCities.forEach((e) => {
        if (e.name === city) throw new ConflictException();
      });

      await this.citiesRepository.includeCity(cityInfo, userId);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cidade não encontrada');
    }
    return await this.citiesRepository.findUserCities(userId);
  }

  async getTemps(user_id: number) {
    const cities = await this.citiesRepository.findUserCities(user_id);

    cities.forEach(async (e) => {
      try {
        const response = await lastValueFrom(
          this.httService.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${e.name}&units=metric&appid=${this.KEY}&lang=pt_br`,
          ),
        );

        const cityInfoUpdate: CityDTO = {
          name: response.data.name,
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          humidity: response.data.main.humidity,
          icon: response.data.weather[0].icon,
          country: response.data.sys.country,
        };

        this.citiesRepository.updateCity(cityInfoUpdate, e.id);
      } catch (error) {
        console.log(error);
      }
    });

    return await this.citiesRepository.findUserCities(user_id);
  }
}
