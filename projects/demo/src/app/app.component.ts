import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { ComposerService } from 'projects/library/src/lib/services/composer.service';
import { ACAEngineOptions, EngineZone, EngineSettings } from '@acaengine/ts-client';

import { Md5 } from 'ts-md5';

declare global {
    interface Window {
        composer: ComposerService;
        EngineZone: any;
        EngineSettings: any;
        debug: boolean;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: `./app.component.html`,
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public model: { [name: string]: any } = {};

    constructor(private _composer: ComposerService) { }

    public ngOnInit(): void {
        window.composer = this._composer;
        window.EngineZone = EngineZone;
        window.EngineSettings = EngineSettings;
        window.debug = true;
        this.initialiseComposer();
    }

    public initialiseComposer(tries: number = 0) {
            // Get domain information for configuring composer
        const host = location.hostname;
        const protocol = location.protocol;
        const port = location.port;
        const url = location.origin;
            // Generate configuration for composer
        const config: ACAEngineOptions = {
            scope: 'public',
            host: `${host}:${port}`,
            auth_uri: `${url}/auth/oauth/authorize`,
            token_uri: `${url}/auth/token`,
            redirect_uri: `${location.origin}/oauth-resp.html`,
            handle_login: true,
            mock: false
        };
        localStorage.setItem(`${Md5.hashStr(config.redirect_uri)}_access_token`, 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBQ0FFIiwiaWF0IjoxNTc4MDEyMDYzLCJleHAiOjE1NzkyMjE2NjMsImF1ZCI6ImxvY2FsaG9zdCIsInN1YiI6Ijg1VmJPbjE2ZWJBRnYwIiwidSI6eyJuIjoiQUNBIFN1cHBvcnQgKGxvY2FsaG9zdDo4MDgwKSIsImUiOiJzdXBwb3J0QGFjYS5pbSIsInAiOjJ9fQ.a_MdB4pUCRiwjWgoaW_7jt0aRk61piD1TuZ0HqwabrCed1BsM5vM4VD39UOhs9uKPj4eHAIM7lPbSBhjdNDtAhy_xBsoosoap5Qv9kC-ZjaEN3zcRjstgsYwFwtlLFCDBxOd5gAJVwtgXLcB8bzbzYtvl2i_UAtm5fDSL_WpUHKeGyGJEvPowDgzlBn0FqYrq6BdTOg6YotqiKMO2EhDiXDFYjIrZl4hU36gLZu_Gp5nSBCukrT0MX-nR9V4ySbBD_5pinV9PikIArNTBZLuSbhjo5ohzcljlJREuFrc38L0uoTmbitLk-qIEPYie4yrjjwkEmV-FWLVz4i_NTFM1Q');
            // Setup/Initialise composer
        this._composer.setup(config);
    }
}
