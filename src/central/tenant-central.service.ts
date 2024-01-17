import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TenantCentral } from './schema/tenant-central.schema';
import { CreateTenantCentralDto } from './dto/create-tenant-central.dto';
import { UpdateTenantCentralDto } from './dto/update-tenant-central.dto';

@Injectable()
export class TenantCentralService {
  constructor(
    @InjectModel('TenantCentral')
    private readonly tenantCentralModel: Model<TenantCentral>,
  ) {}

  async create(createTenantCentralDto: CreateTenantCentralDto): Promise<void> {
    const created = new this.tenantCentralModel(createTenantCentralDto);

    await created.save();
  }

  async findCentralByTenant(tenant: string): Promise<Types.ObjectId | null> {
    const mapping = await this.tenantCentralModel.findOne({ tenant }).exec();

    return mapping ? mapping.central._id : null;
  }

  async findAll(): Promise<TenantCentral[]> {
    return await this.tenantCentralModel.find().exec();
  }

  async findOne(id: string): Promise<TenantCentral> {
    const tenantCentral = await this.tenantCentralModel.findById(id).exec();

    if (!tenantCentral) {
      throw new NotFoundException('Central with this tenant not found');
    }

    return tenantCentral;
  }

  async update(
    id: string,
    updateTenantCentralDto: UpdateTenantCentralDto,
  ): Promise<TenantCentral> {
    const tenantCentral = await this.tenantCentralModel
      .findOneAndUpdate({ _id: id }, updateTenantCentralDto, { new: true })
      .exec();

    if (!tenantCentral) {
      throw new NotFoundException('Central with this tenant not found');
    }

    return tenantCentral;
  }

  async remove(id: string): Promise<void> {
    const tenantCentral = await this.tenantCentralModel
      .findByIdAndDelete(id)
      .exec();

    if (!tenantCentral) {
      throw new NotFoundException('Central with this tenant not found');
    }
  }
}
