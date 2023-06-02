import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TasksModule from './tasks/tasks.module';
import AbilityModule from './ability/ability.module';
import ListModule from './properties/list/list.module';
import DelistModule from './properties/delist/delist.module';
import TenantModule from './properties/tenant/tenant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'real-estate-manager',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AbilityModule,
    ListModule,
    DelistModule,
    TenantModule,
    TasksModule,
  ],
})
export default class AppModule {}
