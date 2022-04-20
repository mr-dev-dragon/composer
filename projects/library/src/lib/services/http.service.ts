import { Injectable } from '@angular/core';
import { EngineHttpClient } from '@acaengine/ts-client';

import { ComposerService } from './composer.service';

/**
 * Wrapper service for the HTTP client in composer
 */
@Injectable({
    providedIn: 'root'
})
export class EngineHttpService {

    private get http(): EngineHttpClient {
        return this._composer.http;
    }

    constructor(private _composer: ComposerService) { }

    /**
     * Perform AJAX HTTP GET request
     * @param url URL of the GET endpoint
     * @param options Options to add to the request
     */
    public get get() {
        return this.http.get;
    }

    /**
     * Perform AJAX HTTP POST request
     * @param url URL of the POST endpoint
     * @param body Body contents of the request
     * @param options Options to add to the request
     */
    public get post() {
        return this.http.post;
    }

    /**
     * Perform AJAX HTTP PUT request
     * @param url URL of the PUT endpoint
     * @param body Body contents of the request
     * @param options Options to add to the request
     */
    public get put() {
        return this.http.put;
    }

    /**
     * Perform AJAX HTTP PATCH request
     * @param url URL of the PATCH endpoint
     * @param body Body contents of the request
     * @param options Options to add to the request
     */
    public get patch() {
        return this.http.patch;
    }

    /**
     * Perform AJAX HTTP DELETE request
     * @param url URL of the DELETE endpoint
     * @param options Options to add to the request
     */
    public get delete() {
        return this.http.delete;
    }
}
