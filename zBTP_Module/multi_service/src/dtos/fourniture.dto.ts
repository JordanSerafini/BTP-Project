export class CreateFournitureDto {
  name: string;
  description: string;
  unit: string;
  quantity: number;
  total_price: number;
}

export class UpdateFournitureDto {
  name: string;
  description?: string;
  unit?: string;
  quantity?: number;
  total_price?: number;
}
