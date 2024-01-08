import { IsString } from 'class-validator';

export class CreateHistoricDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  content: string;

  @IsString()
  status: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
