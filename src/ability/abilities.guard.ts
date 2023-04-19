import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Property from 'src/properties/property.entity';
import PropertiesService from 'src/properties/properties.service';
import UsersService from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import AbilityFactory from './ability.factory/ability.factory';
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator';

@Injectable()
export default class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private propertiesService: PropertiesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const user = await this.usersService.getUserById(userId);
    const ability = AbilityFactory.defineAbility(user);

    const asyncEvery = async (
      rulesArr: RequiredRule[],
      predicate: (rule: RequiredRule) => Promise<boolean>,
    ): Promise<boolean> => {
      for (const rule of rulesArr) {
        if (await predicate(rule)) {
          return true;
        }
      }
      return false;
    };

    return asyncEvery(rules, async (rule: RequiredRule) => {
      if (rule.subject === Property) {
        const propertyId = req.params.id;
        const property = await this.propertiesService.getPropertyById(
          propertyId,
        );
        return ability.can(rule.action, property);
      }
      if (rule.subject === User) {
        const reqUserId = req.params.id;
        const reqUser = await this.usersService.getUserById(reqUserId);
        return ability.can(rule.action, reqUser);
      }
      return ability.can(rule.action, rule.subject);
    });
  }
}
