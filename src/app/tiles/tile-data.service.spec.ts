import { TestBed } from '@angular/core/testing';

import { TileDataService } from './tile-data.service';

describe('TileDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TileDataService = TestBed.get(TileDataService);
    expect(service).toBeTruthy();
  });
});
