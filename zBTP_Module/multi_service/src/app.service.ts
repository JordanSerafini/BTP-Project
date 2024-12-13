import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fourniture, FournitureDocument } from './schemas/fourniture.schema';
import { Outils, OutilsDocument } from './schemas/outils.schema';
import { Personnel, PersonnelDocument } from './schemas/personnel.schema';
import {
  CreateFournitureDto,
  UpdateFournitureDto,
} from '../../database/dtos/fourniture.dto';
import { CreateOutilsDto, UpdateOutilsDto } from '../../database/dtos/outils.dto';
import { CreatePersonnelDto, UpdatePersonnelDto } from './dtos/personnel.dto';

@Injectable()
export class MicroserviceService {
  constructor(
    @InjectModel(Fourniture.name)
    private fournitureModel: Model<FournitureDocument>,
    @InjectModel(Outils.name) private outilsModel: Model<OutilsDocument>,
    @InjectModel(Personnel.name)
    private PersonnelModel: Model<PersonnelDocument>,
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

  async deleteOutilsByName(name: string): Promise<Outils> {
    return this.outilsModel.findOneAndDelete({ name }).exec();
  }

  // Personnel CRUD
  async findAllPersonnels(): Promise<Personnel[]> {
    return this.PersonnelModel.find().exec();
  }

  async createPersonnel(data: CreatePersonnelDto): Promise<Personnel> {
    const Personnel = new this.PersonnelModel(data);
    return Personnel.save();
  }

  async updatePersonnel(
    id: string,
    data: UpdatePersonnelDto,
  ): Promise<Personnel> {
    return this.PersonnelModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  async deletePersonnel(id: string): Promise<Personnel> {
    return this.PersonnelModel.findByIdAndDelete(id).exec();
  }
}
