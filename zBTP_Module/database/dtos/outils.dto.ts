export class CreateOutilsDto {
  name: string;
  type: string;
  available: boolean;
  quantity: number;
  quantity_available: number;
}

export class UpdateOutilsDto {
  name?: string;
  type?: string;
  available?: boolean;
  quantity?: number;
  quantity_available?: number;
}
