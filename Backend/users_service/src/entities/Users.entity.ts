export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  image?: string;
  phone?: string;
  age?: number;
  adress?: string;
  city?: string;
  favorites?: string;
  roles: string;
  created_at: Date;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
