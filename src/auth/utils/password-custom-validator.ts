import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export default class MaxPasswordLength implements ValidatorConstraintInterface {
  validate(text: string, _args: ValidationArguments): boolean {
    const byteSize = (str: string): number => new Blob([str]).size;
    return byteSize(text) > 1 && byteSize(text) < 72;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Password is too long!';
  }
}
