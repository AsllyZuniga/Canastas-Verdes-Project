import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseSsl = configService.get<string>('DATABASE_SSL');
  const useSsl = databaseSsl ? databaseSsl === 'true' : true;

  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASS'),
    database: configService.get<string>('DATABASE_NAME'),
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    logging: false,
    autoLoadEntities: true,
    synchronize: true,
  };
};
