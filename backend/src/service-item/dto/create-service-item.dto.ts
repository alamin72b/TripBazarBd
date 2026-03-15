import { ServiceCategory } from '@prisma/client';

export class CreateServiceItemDto {
  title: string;
  category: ServiceCategory;
  description: string;
  price: number;
  coverImageUrl: string;
  whatsappNumber: string;
}
