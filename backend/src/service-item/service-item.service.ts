import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceItemDto } from './dto/create-service-item.dto';

@Injectable()
export class ServiceItemService {
  // Inject the global database connection
  constructor(private readonly prisma: PrismaService) {}

  // POST: Create a new travel deal in MySQL
  async create(createServiceItemDto: CreateServiceItemDto) {
    return this.prisma.serviceItem.create({
      data: createServiceItemDto,
    });
  }

  // GET: Fetch all travel deals from MySQL (newest first)
  async findAll() {
    return this.prisma.serviceItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET: Find one specific deal by its ID
  async findOne(id: string) {
    return this.prisma.serviceItem.findUnique({
      where: { id },
    });
  }

  update(id: string, updateServiceItemDto: any) {
    return `This action updates a #${id} serviceItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} serviceItem`;
  }
}
