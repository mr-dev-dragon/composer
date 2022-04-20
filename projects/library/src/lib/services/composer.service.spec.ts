import { TestBed } from '@angular/core/testing';

import { ComposerService } from './composer.service';

describe('ComposerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ComposerService = TestBed.get(ComposerService);
        expect(service).toBeTruthy();
    });
});
