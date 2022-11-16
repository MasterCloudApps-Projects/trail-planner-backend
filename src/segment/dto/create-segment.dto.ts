import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSegmentDto {
  @IsNumber()
  @IsNotEmpty()
  public trackId: number;
  @IsString()
  @IsNotEmpty()
  public title: string;
  @IsString()
  @IsNotEmpty()
  public description: string;
  @IsNumber()
  @IsNotEmpty()
  public initialPointId: number;
  @IsNumber()
  @IsNotEmpty()
  public finalPointId: number;
}
