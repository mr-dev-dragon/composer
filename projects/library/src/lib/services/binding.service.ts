import { Injectable } from '@angular/core';
import { EngineBindingService } from '@acaengine/ts-client';

import { ComposerService } from './composer.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BindingService extends EngineBindingService {
    /** Whether composer is initialised */
    public _initialised: boolean = false;

    constructor(private composer: ComposerService) {
        super(undefined);
        this.composer.initialised.subscribe((init) => {
            this._initialised = init;
            if (init) {
                (this as any)._websocket = this.composer.realtime;
            }
        });
    }

    /** Whether composer is initialised */
    public get initialised(): boolean {
        return this._initialised;
    }

    /** Observable */
    public get is_initialised(): Observable<boolean> {
        return this.composer.initialised;
    }
}
