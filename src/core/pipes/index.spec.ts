import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './index';

describe('ZodValidationPipe', () => {
  const testSchema = z.object({
    name: z.string().min(3),
    age: z.number().positive(),
  });

  const pipe = new ZodValidationPipe(testSchema);

  it('should successfully validate and return valid input', async () => {
    const validInput = { name: 'Alice', age: 25 };
    const result = await pipe.transform(validInput, { type: 'body' });
    expect(result).toEqual(validInput);
  });

  it('should throw BadRequestException with details on invalid input', async () => {
    const invalidInput = { name: 'Al', age: -5 };

    await expect(pipe.transform(invalidInput, { type: 'body' })).rejects.toThrow(BadRequestException);

    try {
      await pipe.transform(invalidInput, { type: 'body' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      const response = (error as BadRequestException).getResponse() as { message?: string; details?: unknown[] };
      expect(response.message).toBe('Validation failed');
      expect(Array.isArray(response.details)).toBe(true);
      expect(response.details?.length).toBeGreaterThan(0);
    }
  });
});
