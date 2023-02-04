import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentService.create(createSegmentDto);
  }

  @Get()
  findAll() {
    return this.segmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentDto: UpdateSegmentDto) {
    return this.segmentService.update(+id, updateSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentService.remove(+id);
  }
}
