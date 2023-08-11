import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CityDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  humidity: number;

  @IsNumber()
  temp: number;

}