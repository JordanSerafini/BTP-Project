export class CreatePersonnelDto {
  name: string;
  role: string;
  active: boolean;
  phone: string;
  email: string;
}

export class UpdatePersonnelDto {
  name?: string;
  role?: string;
  active?: boolean;
  phone?: string;
  email?: string;
}
