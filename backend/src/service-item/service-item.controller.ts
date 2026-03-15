import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceItemService } from './service-item.service';
import { CreateServiceItemDto } from './dto/create-service-item.dto';
import { UpdateServiceItemDto } from './dto/update-service-item.dto';

@Controller('service-item')
export class ServiceItemController {
  constructor(private readonly serviceItemService: ServiceItemService) {}

  @Post()
  create(@Body() createServiceItemDto: CreateServiceItemDto) {
    return this.serviceItemService.create(createServiceItemDto);
  }

  @Get()
  findAll() {
    return this.serviceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceItemService.findOne(id); // Removed the '+'
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceItemDto: UpdateServiceItemDto,
  ) {
    return this.serviceItemService.update(id, updateServiceItemDto); // Removed the '+'
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceItemService.remove(id); // Removed the '+'
  }
}
