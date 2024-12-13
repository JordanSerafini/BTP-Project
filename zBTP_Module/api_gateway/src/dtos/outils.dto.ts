export class CreateOutilsDto {
  name: string;
  type: string;
  available: boolean;
}

export class UpdateOutilsDto {
  name?: string;
  type?: string;
  available?: boolean;
}
