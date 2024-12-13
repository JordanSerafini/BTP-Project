import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devis, DevisDocument } from './schemas/devis.schema';
import { CreateDevisDto, UpdateDevisDto } from './dto/devis.dto';
@Injectable()
export class DevisService {
  constructor(
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
  ) {}

  async findAll(): Promise<Devis[]> {
    return this.devisModel.find().populate('DevisLines').exec();
  }

  async findOne(id: string): Promise<Devis> {
    return this.devisModel.findById(id).populate('DevisLines').exec();
  }

  async create(createDevisDto: CreateDevisDto): Promise<Devis> {
    const devis = new this.devisModel(createDevisDto);
    return devis.save();
  }

  async update(id: string, updateDevisDto: UpdateDevisDto): Promise<Devis> {
    return this.devisModel
      .findByIdAndUpdate(id, updateDevisDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.devisModel.findByIdAndDelete(id).exec();
  }
}
