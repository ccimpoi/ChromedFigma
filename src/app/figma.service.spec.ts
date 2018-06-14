import { TestBed, inject } from '@angular/core/testing';

import { FigmaService } from './figma.service';

describe('FigmaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FigmaService]
    });
  });

  it('should be created', inject([FigmaService], (service: FigmaService) => {
    expect(service).toBeTruthy();
  }));
});
