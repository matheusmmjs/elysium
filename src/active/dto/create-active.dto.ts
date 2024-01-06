import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActiveDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
