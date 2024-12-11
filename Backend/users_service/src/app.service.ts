import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Pool } from 'pg';
import { User } from './entities/Users.entity';
import { CustomLogger } from './logging/custom-logger.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new CustomLogger('UsersService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows.map((user) => new User(user));
  }

  async findOne(email: string): Promise<User> {
    this.logger.log(`Fetching user with email: ${email}`);
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (result.rowCount === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return new User(result.rows[0]);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating a new user');
    const {
      username,
      password,
      email,
      image,
      phone,
      age,
      address,
      city,
      favorites,
    } = createUserDto;

    // Vérification des doublons (email)
    const existingUser = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (existingUser.rowCount > 0) {
      throw new BadRequestException('A user with this email already exists');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, password, email, image, phone, age, address, city, favorites, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *;
    `;

    const values = [
      username,
      hashedPassword,
      email,
      image || null,
      phone || null,
      age || null,
      address || null,
      city || null,
      favorites || null,
    ];

    const result = await this.pool.query(query, values);
    const newUser = new User(result.rows[0]);

    this.logger.log(`User created with email: ${newUser.email}`);
    return newUser;
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user with email: ${email}`);
    const { username, password, image, phone, age, address, city, favorites } =
      updateUserDto;

    const existingUser = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (existingUser.rowCount === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
      UPDATE users
      SET username = COALESCE($1, username),
          password = COALESCE($2, password),
          image = COALESCE($3, image),
          phone = COALESCE($4, phone),
          age = COALESCE($5, age),
          address = COALESCE($6, address),
          city = COALESCE($7, city),
          favorites = COALESCE($8, favorites)
      WHERE email = $9
      RETURNING *;
    `;

    const values = [
      username || null,
      hashedPassword,
      image || null,
      phone || null,
      age || null,
      address || null,
      city || null,
      favorites || null,
      email,
    ];

    const result = await this.pool.query(query, values);
    const updatedUser = new User(result.rows[0]);

    this.logger.log(`User updated with email: ${updatedUser.email}`);
    return updatedUser;
  }

  async remove(email: string): Promise<void> {
    this.logger.log(`Deleting user with email: ${email}`);
    const result = await this.pool.query(
      'DELETE FROM users WHERE email = $1 RETURNING *',
      [email],
    );

    if (result.rowCount === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    this.logger.log(`User with email ${email} deleted`);
  }
}
