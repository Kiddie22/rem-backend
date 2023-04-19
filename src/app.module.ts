import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from './auth/auth.module';
import PropertiesModule from './properties/properties.module';
import UsersModule from './users/users.module';
import AbilityModule from './ability/ability.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'real-estate-manager',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AbilityModule,
    PropertiesModule,
    UsersModule,
  ],
})
export default class AppModule {}
