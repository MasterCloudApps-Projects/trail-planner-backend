import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateFeatureFlagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  isEnabled = false;
}

export default CreateFeatureFlagDto;
