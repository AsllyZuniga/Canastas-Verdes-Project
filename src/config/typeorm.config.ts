import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASS'),
  database: configService.get<string>('DATABASE_NAME'),
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  entities: [join(__dirname + '../../**/*.entity.{ts,js}')],
  synchronize: true,
});
