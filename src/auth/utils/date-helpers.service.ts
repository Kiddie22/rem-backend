import { Injectable } from '@nestjs/common';

@Injectable()
export default class DateHelpersService {
  static returnTimePlusMinutes(minutes: number): Date {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    return date;
  }
}
