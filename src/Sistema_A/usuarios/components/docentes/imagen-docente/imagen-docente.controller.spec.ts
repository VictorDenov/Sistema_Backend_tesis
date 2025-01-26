import { Test, TestingModule } from '@nestjs/testing';
import { ImagenDocenteController } from './imagen-docente.controller';
import { ImagenDocenteService } from './imagen-docente.service';

describe('ImagenDocenteController', () => {
  let controller: ImagenDocenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenDocenteController],
      providers: [ImagenDocenteService],
    }).compile();

    controller = module.get<ImagenDocenteController>(ImagenDocenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
