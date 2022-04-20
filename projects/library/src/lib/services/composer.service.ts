import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ACAEngine,
    EngineAuthService,
    EngineBindingService,
    EngineWebsocket,
    EngineApplicationsService,
    EngineDriversService,
    EngineModulesService,
    EngineSystemsService,
    EngineZonesService,
    EngineUsersService,
    EngineHttpClient,
    EngineDomainsService,
    ACAEngineOptions,
    EngineTriggersService,
    EngineSystemTriggersService,
    EngineSettingsService,
    EngineRepositoriesService,
    EngineOAuthSourcesService,
    EngineSAMLSourcesService,
    EngineLDAPSourcesService
} from '@acaengine/ts-client';

@Injectable({
    providedIn: 'root'
})
export class ComposerService {
    /** Initialise ACAEngine API */
    public setup(options: ACAEngineOptions) {
        ACAEngine.init(options);
    }

    /** Observable for the intialised state of composer */
    public get initialised(): Observable<boolean> {
        return ACAEngine.initialised;
    }

    /** Observable for the intialised state of composer */
    public get is_initialised(): boolean {
        return ACAEngine.is_initialised;
    }

    /** HTTP Client for making request with composer credentials */
    public get http(): EngineHttpClient {
        return ACAEngine.http;
    }

    /** Authentication service for Composer */
    public get auth(): EngineAuthService {
        return ACAEngine.auth;
    }

    /** Service for binding to engine's realtime API */
    public get bindings(): EngineBindingService {
        return ACAEngine.bindings;
    }
    /** HTTP service for engine applications */
    public get applications(): EngineApplicationsService {
        return ACAEngine.applications;
    }

    /** HTTP service for engine auth sources */
    public get oauth_sources(): EngineOAuthSourcesService {
        return ACAEngine.oauth_sources;
    }

    /** HTTP service for engine auth sources */
    public get saml_sources(): EngineSAMLSourcesService {
        return ACAEngine.saml_sources;
    }

    /** HTTP service for engine auth sources */
    public get ldap_sources(): EngineLDAPSourcesService {
        return ACAEngine.ldap_sources;
    }

    /** HTTP service for engine domains */
    public get domains(): EngineDomainsService {
        return ACAEngine.domains;
    }

    /** Interface for engine realtime API communications */
    public get realtime(): EngineWebsocket {
        return ACAEngine.realtime;
    }

    /** HTTP service for engine drivers */
    public get drivers(): EngineDriversService {
        return ACAEngine.drivers;
    }

    /** HTTP service for engine modules */
    public get modules(): EngineModulesService {
        return ACAEngine.modules;
    }

    /** HTTP service for engine repositories */
    public get repositories(): EngineRepositoriesService {
        return ACAEngine.repositories;
    }

    /** HTTP service for engine systems */
    public get systems(): EngineSystemsService {
        return ACAEngine.systems;
    }

    /** HTTP service for engine triggers */
    public get triggers(): EngineTriggersService {
        return ACAEngine.triggers;
    }

    /** HTTP service for engine system triggers */
    public get system_triggers(): EngineSystemTriggersService {
        return ACAEngine.system_triggers;
    }

    /** HTTP service for engine auth sources */
    public get users(): EngineUsersService {
        return ACAEngine.users;
    }

    /** HTTP service for engine auth sources */
    public get settings(): EngineSettingsService {
        return ACAEngine.settings;
    }

    /** HTTP service for engine auth sources */
    public get zones(): EngineZonesService {
        return ACAEngine.zones;
    }
}
