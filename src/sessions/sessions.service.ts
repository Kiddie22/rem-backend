import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateSessionDto from './dto/create-session.dto';
import Session from './entities/session.entity';

@Injectable()
export default class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sesssionsRepository: Repository<Session>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = this.sesssionsRepository.create({
      ...createSessionDto,
      isValid: true,
    });
    await this.sesssionsRepository.save(session);
    return session;
  }

  async getSessionById(sessionId: string): Promise<Session> {
    const session = await this.sesssionsRepository.findOneBy({ sessionId });
    if (session) return session;
    throw new NotFoundException();
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = await this.getSessionById(sessionId);
    session.isValid = false;
    await this.sesssionsRepository.save(session);
  }

  async updateSession(sessionId: string): Promise<Session> {
    const session = await this.getSessionById(sessionId);
    session.expiredAt = Date.now() + 900000;
    await this.sesssionsRepository.save(session);
    return session;
  }

  async sessionCleanup(userId: string): Promise<void> {
    await this.sesssionsRepository.delete({
      userId,
      isValid: false,
    });
  }

  // async removeSession(sessionId: string): Promise<void> {
  //   await this.getSessionById(sessionId);
  //   this.sesssionsRepository.delete({ sessionId });
  // }
}
