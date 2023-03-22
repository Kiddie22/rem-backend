import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from './auth/auth.module';
import PropertiesModule from './properties/properties.module';

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
    PropertiesModule,
  ],
})
export default class AppModule {}
