import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCentralDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tenant: string;

  @IsString()
  @IsOptional()
  description: string;
}
