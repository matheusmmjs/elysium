import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCentralDto } from './dto/create-central.dto';
import { Central } from './schema/central.schema';
import { UpdateCentralDto } from './dto/update-central.dto';

@Injectable()
export class CentralService {
  constructor(
    @InjectModel('Central') private readonly centralModel: Model<Central>,
  ) {}

  async create(createCentralDto: CreateCentralDto): Promise<void> {
    const createdCentral = new this.centralModel(createCentralDto);

    await createdCentral.save();
  }

  async findAll(): Promise<Central[]> {
    return this.centralModel.find().exec();
  }

  async findOne(id: string): Promise<Central> {
    const central = await this.centralModel.findById(id).exec();

    if (!central) {
      throw new NotFoundException('Central not found');
    }

    return central;
  }

  async update(
    id: string,
    updateCentralDto: UpdateCentralDto,
  ): Promise<Central> {
    const central = await this.centralModel
      .findOneAndUpdate({ _id: id }, updateCentralDto, { new: true })
      .exec();

    if (!central) {
      throw new NotFoundException('Central not found');
    }

    return central;
  }

  async remove(id: string): Promise<void> {
    const central = await this.centralModel.findByIdAndDelete(id).exec();

    if (!central) {
      throw new NotFoundException('Central not found');
    }
  }
}
