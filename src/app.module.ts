import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AbilityModule from './ability/ability.module';
import ListModule from './properties/list/list.module';

@Module({
  imports: [
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
    ListModule,
  ],
})
export default class AppModule {}
