import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import FeatureFlag from './featureFlag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateFeatureFlagDto from './dto/createFeatureFlag.dto';
import UpdateFeatureFlagDto from './dto/updateFeatureFlag.dto';
import PostgresErrorCode from '../database/postgresErrorCode.enum';

@Injectable()
export default class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlag)
    private featureFlagsRepository: Repository<FeatureFlag>,
  ) {}

  getAll() {
    return this.featureFlagsRepository.find();
  }

  getByName(name: string) {
    return this.featureFlagsRepository.findOneBy({ name });
  }

  async create(featureFlag: CreateFeatureFlagDto) {
    try {
      const newFlag = await this.featureFlagsRepository.create(featureFlag);
      await this.featureFlagsRepository.save(newFlag);
      return newFlag;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Feature flag with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, featureFlag: UpdateFeatureFlagDto) {
    try {
      await this.featureFlagsRepository.update(id, featureFlag);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Feature flag with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const updatedFeatureFlag = await this.featureFlagsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedFeatureFlag) {
      return updatedFeatureFlag;
    }
    throw new NotFoundException();
  }

  async delete(id: number) {
    const deleteResponse = await this.featureFlagsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }

  async isEnabled(name: string) {
    const featureFlag = await this.getByName(name);
    if (!featureFlag) {
      return false;
    }
    return featureFlag.isEnabled;
  }
}
