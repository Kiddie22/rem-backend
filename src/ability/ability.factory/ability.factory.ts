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
  'owner.id': Property['owner']['id'];
};

@Injectable()
export default class AbilityFactory {
  static defineAbility(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('Read', Property);
    can<FlatProperty>('Update', Property, { 'owner.id': user.id });
    can<FlatProperty>('Delete', Property, { 'owner.id': user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
