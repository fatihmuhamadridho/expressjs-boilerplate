import type { NextFunction, Request, Response } from 'express';
import { DummyJsonGatewayError } from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
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
      writeDummyJsonResponse(response, await this.useCase.Execute(input));
    } catch (error) {
      if (error instanceof DummyJsonGatewayError) {
        response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
        return;
      }
      next(error);
    }
  };
}
