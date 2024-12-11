export class User {
  id: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  image?: string;
  phone?: string;
  age?: number;
  address?: string;
  postalcode?: string;
  city?: string;
  role: string;
  created_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
