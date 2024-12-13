import { IsString, IsDate, IsArray, IsOptional } from 'class-validator';

export class CreateDevisDto {
  @IsString()
  numero: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  notes: string;

  @IsString()
  client: string;

  @IsString()
  status: string;

  @IsDate()
  debut_prevu: Date;

  @IsDate()
  fin_prevu: Date;

  @IsDate()
  date_echeance: Date;

  @IsString()
  mode_reglement: string;

  @IsString()
  tva: string;

  @IsArray()
  @IsOptional()
  DevisLines?: string[];
}

export class UpdateDevisDto extends CreateDevisDto {}
