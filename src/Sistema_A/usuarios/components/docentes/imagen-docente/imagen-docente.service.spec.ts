import { Test, TestingModule } from '@nestjs/testing';
import { ImagenDocenteService } from './imagen-docente.service';

describe('ImagenDocenteService', () => {
  let service: ImagenDocenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenDocenteService],
    }).compile();

    service = module.get<ImagenDocenteService>(ImagenDocenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
