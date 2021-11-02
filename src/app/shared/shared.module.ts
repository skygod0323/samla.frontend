/**
 * Created by ApolloYr on 2/5/2018.
 */
import { NgModule } from '@angular/core';

import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";
import { CheckoutModalComponent } from './modal/checkout-modal/checkout-modal.component';
import { CommonModule } from '@angular/common';
import { CheckDoneModalComponent } from './modal/checkdone-modal/checkdone-modal.component';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    entryComponents: [
        CheckoutModalComponent,
        CheckDoneModalComponent
    ],
    declarations: [
        CheckoutModalComponent,
        CheckDoneModalComponent
    ],
    exports: [
        CheckoutModalComponent,
        CheckDoneModalComponent
    ],
    providers: [],
})
export class SharedModule {

}