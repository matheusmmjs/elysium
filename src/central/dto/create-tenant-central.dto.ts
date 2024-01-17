import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTenantCentralDto {
  @IsString()
  @IsNotEmpty()
  tenant: string;

  @IsObject()
  @IsNotEmpty()
  central: object;
}
