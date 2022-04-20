
import { MockHttpRequestHandlerOptions, generateMockSystem } from '@acaengine/ts-client';

const MOCK_SYSTEMS = Array(Math.floor(Math.random() * 100 + 5)).fill(0).map(i => generateMockSystem());

const handlers: MockHttpRequestHandlerOptions[] = [
    {
        path: '/api/engine/v1/systems',
        metadata: {},
        method: 'GET',
        callback: (request) => MOCK_SYSTEMS
    },
    {
        path: '/api/engine/v1/systems/:id',
        metadata: {},
        method: 'GET',
        callback: (request) => {
            console.log('Event:', request);
            return MOCK_SYSTEMS.find(i => request.route_params.id === i.id);
        }
    }
]

window.control.handlers = handlers;
