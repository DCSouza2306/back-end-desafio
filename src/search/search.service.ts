import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CitiesService } from 'src/cities/cities.service';
import { CityDTO } from 'src/cities/dtos/city.dto';

@Injectable()
export class SearchService {
  private KEY = '282138e7ca4db1d8c26eb5ba59d7b4a4';
  constructor(
    private readonly httService: HttpService,
    private readonly citiesService: CitiesService
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
        humidity: response.data.main.humidity
      }

      this.citiesService.includeCity(cityInfo, userId)
      return response.data
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cidade não encontrada');
    }
  }
}
