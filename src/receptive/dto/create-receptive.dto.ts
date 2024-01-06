import { IsString } from 'class-validator';

export class CreateReceptiveDto {
  @IsString()
  SmsMessageSid: string;

  @IsString()
  NumMedia: string;

  @IsString()
  ProfileName: string;

  @IsString()
  SmsSid: string;

  @IsString()
  WaId: string;

  @IsString()
  SmsStatus: string;

  @IsString()
  Body: string;

  @IsString()
  To: string;

  @IsString()
  NumSegments: string;

  @IsString()
  ReferralNumMedia: string;

  @IsString()
  MessageSid: string;

  @IsString()
  AccountSid: string;

  @IsString()
  From: string;

  @IsString()
  ApiVersion: string;
}
