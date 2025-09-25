import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationInput: CreateOrganizationInput) {
    return this.prisma.organization.create({
      data: createOrganizationInput,
    });
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOrganizationInput: UpdateOrganizationInput) {
    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationInput,
    });
  }

  async remove(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    });
  }
}
