import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chantier } from './schema/Chantier.schema';
import { ChantierDocument } from './schema/Chantier.schema';

@Injectable()
export class ChantierService {
  constructor(
    @InjectModel(Chantier.name) private chantierModel: Model<ChantierDocument>,
  ) {}

  async create(chantierData): Promise<Chantier> {
    const chantier = new this.chantierModel(chantierData);
    return chantier.save();
  }

  async findAll(): Promise<Chantier[]> {
    return this.chantierModel.find().exec();
  }

  async findOne(id: string): Promise<Chantier> {
    return this.chantierModel.findById(id).exec();
  }

  async update(id: string, chantierData): Promise<Chantier> {
    return this.chantierModel
      .findByIdAndUpdate(id, chantierData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.chantierModel.findByIdAndDelete(id).exec();
  }
}
