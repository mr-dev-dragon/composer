
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComposerModule } from 'projects/library/src/public-api';
import { FormsModule } from '@angular/forms';

import './example-mocks';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ComposerModule,
        FormsModule,
        RouterModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
