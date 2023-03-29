import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionsService from './sessions.service';
import Session from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [],
  providers: [SessionsService],
  exports: [SessionsService],
})
export default class SessionsModule {}
