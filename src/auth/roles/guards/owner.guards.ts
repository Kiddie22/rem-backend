import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import PropertiesService from 'src/properties/properties.service';

@Injectable()
export default class IsOwnerGuard implements CanActivate {
  constructor(private propertiesService: PropertiesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const propertyId = req.params.id;
    const userId = req.user.id;
    const property = await this.propertiesService.getPropertyById(propertyId);
    if (property.user.id === userId) return true;
    return false;
  }
}
