import { IsNotEmpty, IsString } from 'class-validator';

export class UploadGPXDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
