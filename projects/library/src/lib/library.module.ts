import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { version } from './settings';

import { BindingDirective } from './directives/binding.directive';

import * as dayjs_api from 'dayjs';
const dayjs = dayjs_api;

@NgModule({
    declarations: [
        BindingDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BindingDirective
    ]
})
export class LibraryModule {
    public static version = 'local-dev';
    private static init = false;
    readonly build = dayjs();

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_COMPOSER_MODULE };
export { LibraryModule as ComposerModule };
