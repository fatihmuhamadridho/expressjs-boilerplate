import type { NextFunction, Request, Response } from 'express';

import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import { GenerateImageUseCase } from '../../../application/usecase/generate-image.usecase';
import { ImageMapper } from '../mapper/image.mapper';

export class ImageHandler {
  constructor(
    private readonly useCase: GenerateImageUseCase,
    private readonly mapper: ImageMapper
  ) {}
  generate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const input = this.mapper.ToGenerateImageDTO(this.mapper.ToGenerateImageRequest(request));
      writeResponse(response, await this.useCase.Execute(input));
    } catch (error) {
      next(error);
    }
  };
}
