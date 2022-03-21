import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicesModule } from '@realestate/services';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule,
        MatDialogModule,
        ServicesModule,
        MatMenuModule,
        MatProgressSpinnerModule
    ],
    declarations: [

    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule,
        MatDialogModule,
        ServicesModule,
        MatMenuModule,
        MatProgressSpinnerModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }