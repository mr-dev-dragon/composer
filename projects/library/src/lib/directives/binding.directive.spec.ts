import { BindingDirective } from './binding.directive';

describe('BindingDirective', () => {
    let directive: BindingDirective;
    let service: any;
    let element: any;
    let renderer: any;

    beforeEach(() => {
        service = jasmine.createSpyObj('ComposerService', ['bind', 'exec']);
        element = jasmine.createSpyObj('ElementRef', ['exec']);
        renderer = jasmine.createSpyObj('Renderer2', ['listen']);
        directive = new BindingDirective(service, element, renderer);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
