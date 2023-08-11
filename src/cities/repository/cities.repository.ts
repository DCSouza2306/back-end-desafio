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
        updatedAt: new Date(),
        description: city.description,
      },
    });
  }

  async findAll() {
    return await this.prisma.city.findMany();
  }

  async findUserCities(user_id: number) {
    return await this.prisma.city.findMany({
      where: { user_id },
    });
  }

  async delete(id: number) {
    return await this.prisma.city.delete({
      where: { id },
    });
  }
}
