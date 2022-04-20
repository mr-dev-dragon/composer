import { TestBed } from '@angular/core/testing';

import { EngineHttpService } from './http.service';

describe('HttpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: EngineHttpService = TestBed.get(EngineHttpService);
        expect(service).toBeTruthy();
    });
});
