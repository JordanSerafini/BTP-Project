import { IsString, IsDate, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChantierDto {
  @IsString()
  numero: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  client: string;

  @IsString()
  status: string;

  @IsDate()
  debut_prevu: Date;

  @IsDate()
  fin_prevu: Date;

  @IsArray()
  @IsOptional()
  personnels?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  fournitures?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  outillages?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  devis?: Types.ObjectId[];
}

export class UpdateChantierDto extends CreateChantierDto {}
