import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonPageModule, UiModule } from '@realestate/ui';
import { ServicesModule } from '@realestate/services';


@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonPageModule,
        UiModule,
        ServicesModule
    ],
    declarations: [


    ],
    exports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonPageModule,
        UiModule,
        ServicesModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }