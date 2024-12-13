export class CreatePersonelDto {
  name: string;
  role: string;
  active: boolean;
}

export class UpdatePersonelDto {
  name?: string;
  role?: string;
  active?: boolean;
}
