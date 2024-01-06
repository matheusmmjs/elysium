import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  sender: string;

  @IsString()
  recipient: string;

  @IsString()
  content: string;

  @IsString()
  status: string;

  @IsString()
  name: string;
}
