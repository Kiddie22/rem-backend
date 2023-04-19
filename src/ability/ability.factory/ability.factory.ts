import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import Property from 'src/properties/property.entity';
import User from 'src/users/entities/user.entity';

export type Action = 'Manage' | 'Create' | 'Read' | 'Update' | 'Delete';

export type Subjects = InferSubjects<typeof User | typeof Property> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

type FlatProperty = Property & {
  'user.id': Property['user']['id'];
};

@Injectable()
export default class AbilityFactory {
  static defineAbility(_user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('Read', Property);
    can<FlatProperty>('Update', Property, { 'user.id': _user.id });
    can<FlatProperty>('Delete', Property, { 'user.id': _user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
