export class CreateFournitureDto {
  name: string;
  description: string;
  quantity: number;
}

export class UpdateFournitureDto {
  name?: string;
  description?: string;
  quantity?: number;
}
