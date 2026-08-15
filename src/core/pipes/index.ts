import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe<T = unknown> implements PipeTransform<unknown, Promise<T>> {
  constructor(private readonly schema: ZodSchema<T>) {}

  async transform(value: unknown, _metadata: ArgumentMetadata): Promise<T> {
    const result = await this.schema.safeParseAsync(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        details: result.error.issues,
      });
    }

    return result.data;
  }
}
