import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './ability.factory/ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

const CheckAbilities = (
  ...requirements: RequiredRule[]
): CustomDecorator<string> => SetMetadata(CHECK_ABILITY, requirements);

export default CheckAbilities;
