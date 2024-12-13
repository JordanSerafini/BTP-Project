import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fourniture, FournitureDocument } from './schemas/fourniture.schema';
import { Outils, OutilsDocument } from './schemas/outils.schema';
import { Personel, PersonelDocument } from './schemas/personel.schema';
import {
  CreateFournitureDto,
  UpdateFournitureDto,
} from './dtos/fourniture.dto';
import { CreateOutilsDto, UpdateOutilsDto } from './dtos/outils.dto';
import { CreatePersonelDto, UpdatePersonelDto } from './dtos/personel.dto';

@Injectable()
export class MicroserviceService {
  constructor(
    @InjectModel(Fourniture.name)
    private fournitureModel: Model<FournitureDocument>,
    @InjectModel(Outils.name) private outilsModel: Model<OutilsDocument>,
    @InjectModel(Personel.name) private personelModel: Model<PersonelDocument>,
  ) {}

  // Fourniture CRUD
  async findAllFournitures(): Promise<Fourniture[]> {
    return this.fournitureModel.find().exec();
  }

  async createFourniture(data: CreateFournitureDto): Promise<Fourniture> {
    const fourniture = new this.fournitureModel(data);
    return fourniture.save();
  }

  async updateFourniture(
    id: string,
    data: UpdateFournitureDto,
  ): Promise<Fourniture> {
    return this.fournitureModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteFourniture(id: string): Promise<Fourniture> {
    return this.fournitureModel.findByIdAndDelete(id).exec();
  }

  // Outils CRUD
  async findAllOutils(): Promise<Outils[]> {
    return this.outilsModel.find().exec();
  }

  async createOutil(data: CreateOutilsDto): Promise<Outils> {
    const outil = new this.outilsModel(data);
    return outil.save();
  }

  async updateOutil(id: string, data: UpdateOutilsDto): Promise<Outils> {
    return this.outilsModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteOutil(id: string): Promise<Outils> {
    return this.outilsModel.findByIdAndDelete(id).exec();
  }

  // Personel CRUD
  async findAllPersonels(): Promise<Personel[]> {
    return this.personelModel.find().exec();
  }

  async createPersonel(data: CreatePersonelDto): Promise<Personel> {
    const personel = new this.personelModel(data);
    return personel.save();
  }

  async updatePersonel(id: string, data: UpdatePersonelDto): Promise<Personel> {
    return this.personelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deletePersonel(id: string): Promise<Personel> {
    return this.personelModel.findByIdAndDelete(id).exec();
  }
}
