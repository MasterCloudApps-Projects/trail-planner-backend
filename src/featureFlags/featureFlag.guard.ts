import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  NotFoundException,
  Type,
} from '@nestjs/common';
import FeatureFlagsService from './featureFlags.service';

function FeatureFlagGuard(featureFlagName: string): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly featureFlagsService: FeatureFlagsService) {}

    async canActivate(context: ExecutionContext) {
      const isEnabled = await this.featureFlagsService.isEnabled(
        featureFlagName,
      );
      if (!isEnabled) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        throw new NotFoundException(`Cannot ${request.method} ${request.url}`);
      }
      return true;
    }
  }

  return mixin(Guard);
}

export default FeatureFlagGuard;
