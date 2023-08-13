import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityDTO } from '../dtos/city.dto';
import dayjs from 'dayjs';

@Injectable()
export class CitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async includeCity(city: CityDTO, userId: number) {
    return this.prisma.city.create({
      data: {
        name: city.name,
        user_id: userId,
        humidity: city.humidity,
        temp: city.temp,
        icon: city.icon,
        country: city.country,
        updatedAt: new Date(),
        description: city.description,
      },
    });
  }

  async findAll() {
    return await this.prisma.city.findMany();
  }

  async updateCity(city: CityDTO, id: number){
    return await this.prisma.city.update({
      where: {id},
      data:{
        name: city.name,
        humidity: city.humidity,
        temp: city.temp,
        icon: city.icon,
        country: city.country,
        updatedAt: new Date(),
        description: city.description,
      }
    })
  }

  async findUserCities(user_id: number) {
    return await this.prisma.city.findMany({
      where: { user_id },
      orderBy: {name: 'asc'},
    });
  }

  async delete(id: number) {
    return await this.prisma.city.delete({
      where: { id },
    });
  }
}
