import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';


@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
        HttpClientModule,
    ],
    declarations: [
    ],
    exports: [
        MatSnackBarModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientModule,
        AngularFireStorageModule,
        AngularFireModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }