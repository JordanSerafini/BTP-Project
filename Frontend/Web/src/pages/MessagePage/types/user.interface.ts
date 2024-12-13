export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  profile_image?: string;
  status?: 'online' | 'offline' | 'away';
  created_at?: Date;

  constructor(data: Partial<User>) {
    this._id = data._id || '';
    this.username = data.username || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.profile_image = data.profile_image;
    this.status = data.status || 'offline';
    this.created_at = data.created_at || new Date();
  }

  getfullName() {
    return this.username;
  }

  getStatus() {
    return this.status;
  }
}
