import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class FindOneParams {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export default FindOneParams;
