import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from '../dto/create.user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async getById(id: number){
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async create(user: CreateUserDTO) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }
}
