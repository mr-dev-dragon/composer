import {
    Directive,
    Input,
    SimpleChanges,
    OnInit,
    OnChanges,
    OnDestroy,
    ElementRef,
    Renderer2,
    EventEmitter,
    Output
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BindingService } from '../services/binding.service';

@Directive({
    selector: 'i[bind], [binding], co-bind'
})
export class BindingDirective<T = any> implements OnInit, OnChanges, OnDestroy {
    /** ID of the system to bind */
    @Input() public sys: string;
    /** Class name of the module to bind */
    @Input() public mod: string;
    /** Index of the system to bind */
    @Input() public index = 1;
    /** Status variable to bind to */
    @Input() public bind: string;
    /** Method to execute */
    @Input() public exec: string;
    /** Event to listen for on the parent */
    @Input('onEvent') public on_event: string;
    /** ID of the system to bind to */
    @Input() public params: any[] = [];
    /** Current value of the binding */
    @Input() public model: T;
    /** Emitter for changes to the value of the binding */
    @Output() public modelChange = new EventEmitter<T>();

    /** Listener for event on host element */
    private event_listener: () => void;
    /** Listener for changes to the binding value */
    private listener: Subscription;
    /** Listener for initialisation state of composer */
    private init_listener: Subscription;
    /** Callback to unbind to the status variable */
    private unbind: () => void;

    constructor(
        private _service: BindingService,
        private _element: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {}

    public ngOnInit(): void {
        this.init_listener = this._service.is_initialised.subscribe(init => {
            if (init) {
                this.bindVariable();
                if (this.init_listener) {
                    this.init_listener.unsubscribe();
                    this.init_listener = null;
                }
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.listener) {
            this.listener.unsubscribe();
            this.listener = null;
        }
        if (this.unbind) {
            this.unbind();
            this.unbind = null;
        }
        if (this.event_listener) {
            this.event_listener();
            this.event_listener = null;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.sys || changes.mod || changes.bind) {
            this.ngOnDestroy();
            this.bindVariable();
        }
        if (changes.on_event && this.on_event) {
            if (this.event_listener) {
                this.event_listener();
                this.event_listener = null;
            }
            this.event_listener = this._renderer.listen(
                this._element.nativeElement,
                this.on_event,
                () => this.execute()
            );
        }
    }

    /** Bind to set status variable */
    private bindVariable() {
        if (this._service.initialised && this.bind && this.sys && this.mod) {
            const module = this._service.module(this.sys, this.mod, this.index);
            const binding = module.binding(this.bind);
            this.unbind = binding.bind();
            this.listener = binding.listen(value => setTimeout(() => {
                this.model = value;
                this.modelChange.emit(this.model);
            }, 10));
        }
    }

    /** Excute the set method on the module */
    private execute() {
        if (this._service.initialised && this.exec && this.sys && this.mod) {
            const module = this._service.module(this.sys, this.mod, this.index);
            console.log('Params:', this.params);
            module.exec(this.exec, this.params).then(result => {
                // Emit exec result if not bound to status variable
                if (!this.bind) {
                    this.model = result;
                    this.modelChange.emit(this.model);
                }
            });
        }
    }
    /**
     * Update local value when form control value is changed
     * @param value The new value for the component
     */
    public writeValue(value: T) {
        this.model = value;
        this.modelChange.emit(this.model);
        if (this.exec) {
            this.execute();
        }
    }
}
