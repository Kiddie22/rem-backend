import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'byteLength', async: false })
export default class ByteLengthValidator
  implements ValidatorConstraintInterface
{
  validate(text: string, _args: ValidationArguments): boolean {
    const byteSize = Buffer.byteLength(text, 'utf8');
    return byteSize > 1 && byteSize <= 72;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Password is too long!';
  }
}
